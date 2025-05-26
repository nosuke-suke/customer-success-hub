'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/providers/supabase-auth-provider';
import { addBookReview, getBookReviewsSimple, updateBookReview, deleteBookReview } from '@/lib/books';
import { BookReview } from '@/types/database';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type BookReviewsProps = {
  bookId: string;
};

export default function BookReviews({ bookId }: BookReviewsProps) {
  const { user, loading } = useAuth();
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [newReview, setNewReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!bookId) return;

    try {
      setError(null);
      const data = await getBookReviewsSimple(bookId);
      
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (error: any) {
      setError(error.message || 'レビューの取得に失敗しました。');
      setReviews([]);
    }
  }, [bookId]);

  useEffect(() => {
    if (!loading && bookId) {
      fetchReviews();
    }
  }, [bookId, loading, fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !bookId || !newReview.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const review = await addBookReview(bookId, newReview);
      setReviews(prev => [review, ...prev]);
      setNewReview('');
    } catch (error: any) {
      const errorMessage = error.message || 'レビューの投稿に失敗しました。';
      setError(errorMessage);
      
      if (errorMessage.includes('ログイン') || errorMessage.includes('認証')) {
        alert('ログインセッションが無効です。再度ログインしてください。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (reviewId: string) => {
    if (!editContent.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const updated = await updateBookReview(reviewId, editContent);
      setReviews(prev => 
        prev.map(review => 
          review.id === reviewId ? updated : review
        )
      );
      setEditingReview(null);
      setEditContent('');
    } catch (error: any) {
      const errorMessage = error.message || 'レビューの更新に失敗しました。';
      setError(errorMessage);
      
      if (errorMessage.includes('権限') || errorMessage.includes('見つからない')) {
        alert('このレビューを更新する権限がありません。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (isLoading) return;
    
    const confirmMessage = 'このレビューを削除してもよろしいですか？\n削除したレビューは復元できません。';
    if (!confirm(confirmMessage)) return;

    setIsLoading(true);
    setError(null);
    try {
      await deleteBookReview(reviewId);
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      
      if (editingReview === reviewId) {
        setEditingReview(null);
        setEditContent('');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'レビューの削除に失敗しました。';
      setError(errorMessage);
      
      if (errorMessage.includes('権限') || errorMessage.includes('見つからない')) {
        alert('このレビューを削除する権限がありません。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        <p>{error}</p>
        <button
          onClick={() => fetchReviews()}
          className="mt-2 text-blue-600 hover:underline"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">レビュー</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="レビューを書く..."
            className="w-full p-3 border rounded-lg"
            rows={3}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !newReview.trim()}
            className="px-4 py-2 bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800 rounded-lg disabled:opacity-50"
          >
            {isLoading ? '投稿中...' : '投稿する'}
          </button>
        </form>
      ) : (
        <p className="text-gray-600">レビューを投稿するにはログインが必要です。</p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 bg-gray-50">
            {editingReview === review.id ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                  disabled={isLoading}
                  placeholder="レビュー内容を入力してください..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(review.id)}
                    disabled={isLoading || !editContent.trim()}
                    className="px-3 py-1 bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800 rounded disabled:opacity-50"
                  >
                    {isLoading ? '更新中...' : '更新'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingReview(null);
                      setEditContent('');
                    }}
                    disabled={isLoading}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {review.users_profiles?.avatar_url && (
                      <img
                        src={review.users_profiles.avatar_url}
                        alt="ユーザーアバター"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="font-medium">
                      {review.users_profiles?.username || '名前なし'}
                      {user?.id === review.user_id && (
                        <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          あなた
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {review.created_at && format(new Date(review.created_at), 'yyyy年MM月dd日 HH:mm', { locale: ja })}
                    {review.updated_at && review.updated_at !== review.created_at && (
                      <span className="ml-1 text-xs text-gray-400">(編集済み)</span>
                    )}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap mb-3">{review.content}</p>
                {user?.id === review.user_id && (
                  <div className="flex gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setEditingReview(review.id);
                        setEditContent(review.content);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      disabled={isLoading}
                    >
                      ✏️ 編集
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-sm text-red-600 hover:text-red-800 hover:underline"
                      disabled={isLoading}
                    >
                      🗑️ 削除
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-2">まだレビューがありません</p>
            <p className="text-sm text-gray-500">最初のレビューを投稿してみましょう！</p>
          </div>
        )}
      </div>
    </div>
  );
}