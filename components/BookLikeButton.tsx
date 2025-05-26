'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/supabase-auth-provider';
import { toggleBookLike, getBookLikes } from '@/lib/books';
import { Heart } from 'lucide-react';

type BookLikeButtonProps = {
  bookId: string;
};

export default function BookLikeButton({ bookId }: BookLikeButtonProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLikes = async () => {
    if (!bookId) return;

    try {
      const likes = await getBookLikes(bookId);
      setLikesCount(likes.length);
      if (user) {
        const hasLiked = likes.some(like => like.user_id === user.id);
        setIsLiked(hasLiked);
        console.log('いいねの状態:', { hasLiked, likesCount: likes.length });
      }
    } catch (error) {
      console.error('いいねの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [bookId, user]);

  const handleLike = async () => {
    if (!user || !bookId || isLoading) return;

    setIsLoading(true);
    try {
      const isNowLiked = await toggleBookLike(bookId);
      setIsLiked(isNowLiked);
      setLikesCount(prev => isNowLiked ? prev + 1 : prev - 1);
      console.log('いいね操作完了:', { isNowLiked, newCount: isNowLiked ? likesCount + 1 : likesCount - 1 });
    } catch (error) {
      console.error('いいねの操作に失敗しました:', error);
      // エラー時は状態を元に戻す
      await fetchLikes();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={!user || isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
        ${isLiked 
          ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${!user && 'opacity-50 cursor-not-allowed'}
        ${isLoading && 'opacity-75'}`}
      title={!user ? 'いいねするにはログインが必要です' : undefined}
    >
      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
      <span>{likesCount}</span>
    </button>
  );
} 