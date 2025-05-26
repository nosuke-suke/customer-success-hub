import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { BookLike, BookReview } from '@/types/database';

// 本の型定義
export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  image_url: string;
  amazon_url: string;
  created_at: string;
  updated_at: string;
};

// 全ての本を取得
export const getAllBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('本の取得中にエラーが発生:', error);
      throw error;
    }

    return data as Book[];
  } catch (error) {
    console.error('getAllBooks処理中のエラー:', error);
    throw error;
  }
};

// カテゴリーで本を取得
export const getBooksByCategory = async (category: string) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('本の取得中にエラーが発生:', error);
      throw error;
    }

    return data as Book[];
  } catch (error) {
    console.error('getBooksByCategory処理中のエラー:', error);
    throw error;
  }
};

// いいね関連の関数
export const toggleBookLike = async (bookId: string) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('認証エラー:', authError);
      throw new Error(`認証に失敗しました: ${authError.message}`);
    }
    if (!user) {
      throw new Error('ログインが必要です');
    }

    // 既存のいいねを確認
    const { data: existingLike, error: fetchError } = await supabase
      .from('books_likes')
      .select('*')
      .eq('book_id', bookId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (fetchError) {
      console.error('いいねの確認エラー:', fetchError);
      throw fetchError;
    }

    if (existingLike) {
      // いいねを削除
      const { error: deleteError } = await supabase
        .from('books_likes')
        .delete()
        .eq('book_id', bookId)
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('いいねの削除エラー:', deleteError);
        throw deleteError;
      }
      return false;
    } else {
      // いいねを追加
      const { error: insertError } = await supabase
        .from('books_likes')
        .insert({
          book_id: bookId,
          user_id: user.id
        });

      if (insertError) {
        console.error('いいねの追加エラー:', insertError);
        throw insertError;
      }
      return true;
    }
  } catch (error) {
    console.error('いいね処理エラー:', error);
    throw error;
  }
};

// いいね数を取得
export const getBookLikes = async (bookId: string): Promise<BookLike[]> => {
  try {
    const { data, error } = await supabase
      .from('books_likes')
      .select(`
        *,
        users_profiles (
          username,
          avatar_url
        )
      `)
      .eq('book_id', bookId);

    if (error) {
      console.error('いいね取得エラー:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('いいね取得処理エラー:', error);
    throw error;
  }
};

// レビューを投稿
export const addBookReview = async (bookId: string, content: string): Promise<BookReview> => {
  try {
    console.log('📝 レビュー投稿開始:', { bookId, contentLength: content.length });

    // ステップ1: セッション確認
    console.log('🔐 ステップ1: セッション確認開始');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ セッションエラー:', sessionError);
      throw new Error(`認証エラー: ${sessionError.message}`);
    }
    
    if (!session?.user) {
      console.error('❌ セッションまたはユーザーが存在しません');
      throw new Error('ログインが必要です');
    }

    const user = session.user;
    console.log('✅ セッション確認完了:', { userId: user.id, email: user.email });

    // ステップ2: レビューデータ挿入
    console.log('💾 ステップ2: レビューデータ挿入開始');
    const insertData = {
      book_id: bookId,
      user_id: user.id,
      content: content.trim()
    };
    console.log('挿入データ:', insertData);

    const { data, error: insertError } = await supabase
      .from('books_reviews')
      .insert(insertData)
      .select('*')
      .single();

    if (insertError) {
      console.error('❌ レビュー挿入エラー:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      throw new Error(`レビュー投稿エラー: ${insertError.message}`);
    }

    if (!data) {
      console.error('❌ レビューデータが返されませんでした');
      throw new Error('レビューの保存に失敗しました');
    }

    console.log('✅ レビュー挿入成功:', { reviewId: data.id });

    // ステップ3: プロフィール取得
    console.log('👤 ステップ3: プロフィール取得開始');
    try {
      const { data: profile, error: profileError } = await supabase
        .from('users_profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.warn('⚠️ プロフィール取得エラー:', profileError);
        
        // プロフィールが存在しない場合は作成を試行
        if (profileError.code === 'PGRST116') { // No rows found
          console.log('🆕 プロフィールが存在しないため、新規作成を試行します');
          
          const { data: newProfile, error: createError } = await supabase
            .from('users_profiles')
            .insert({
              id: user.id,
              username: user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`
            })
            .select('username, avatar_url')
            .single();

          if (createError) {
            console.error('❌ プロフィール作成エラー:', createError);
          } else {
            console.log('✅ プロフィール作成成功:', newProfile);
            // 新しく作成したプロフィールを使用
            const reviewWithNewProfile = {
              ...data,
              users_profiles: newProfile
            };
            console.log('🎉 最終レビューデータ（新プロフィール）:', reviewWithNewProfile);
            return reviewWithNewProfile as BookReview;
          }
        }
      } else {
        console.log('✅ プロフィール取得成功:', profile);
        // レビューデータにプロフィール情報を追加
        const reviewWithProfile = {
          ...data,
          users_profiles: profile
        };
        console.log('🎉 最終レビューデータ（既存プロフィール）:', reviewWithProfile);
        return reviewWithProfile as BookReview;
      }
    } catch (profileError) {
      console.warn('⚠️ プロフィール処理エラー:', profileError);
    }

    // プロフィールなしでもレビューデータを返す
    const reviewWithoutProfile = {
      ...data,
      users_profiles: null
    };
    console.log('🎉 最終レビューデータ（プロフィールなし）:', reviewWithoutProfile);
    return reviewWithoutProfile as BookReview;

  } catch (error) {
    console.error('💥 レビュー投稿処理エラー:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });
    throw error;
  }
};

// レビューを取得
export const getBookReviews = async (bookId: string): Promise<BookReview[]> => {
  try {
    console.log('レビュー取得開始:', { bookId });

    // ステップ1: レビューデータの取得（JOINなし）
    const { data: reviews, error } = await supabase
      .from('books_reviews')
      .select('*')
      .eq('book_id', bookId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('レビュー取得エラー詳細:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`レビュー取得エラー: ${error.message}`);
    }

    if (!reviews || reviews.length === 0) {
      console.log('レビューデータが存在しません');
      return [];
    }

    console.log('✅ レビュー取得成功:', {
      reviewCount: reviews.length,
      firstReview: reviews[0] || null
    });

    // ステップ2: ユーザープロフィール情報を別途取得
    const userIds = Array.from(new Set(reviews.map(review => review.user_id)));
    console.log('取得対象ユーザーID:', userIds);
    
    const { data: profiles, error: profileError } = await supabase
      .from('users_profiles')
      .select('id, username, avatar_url')
      .in('id', userIds);

    console.log('プロフィール取得結果:', {
      profileCount: profiles?.length || 0,
      profiles: profiles,
      profileError: profileError?.message
    });

    if (profileError) {
      console.error('プロフィール取得エラー:', profileError);
    }

    // ステップ3: レビューとプロフィールを結合
    const reviewsWithProfiles = reviews.map(review => {
      const profile = profiles?.find(profile => profile.id === review.user_id);
      console.log(`レビュー ${review.id} のプロフィール結合:`, {
        reviewUserId: review.user_id,
        foundProfile: profile
      });
      
      return {
        ...review,
        users_profiles: profile || null
      };
    });

    console.log('プロフィール結合完了:', {
      finalCount: reviewsWithProfiles.length,
      finalData: reviewsWithProfiles
    });
    
    return reviewsWithProfiles as BookReview[];
  } catch (error) {
    console.error('レビュー取得処理エラー:', error);
    throw error;
  }
};

// レビューを更新
export const updateBookReview = async (reviewId: string, content: string): Promise<BookReview> => {
  try {
    console.log('レビュー更新開始:', { reviewId, contentLength: content.length });

    // セッションベースの認証確認
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      throw new Error('ログインが必要です');
    }

    // ステップ1: レビューを更新（JOINなし）
    const { data: updatedReview, error: updateError } = await supabase
      .from('books_reviews')
      .update({ 
        content: content.trim(),
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .eq('user_id', session.user.id)
      .select('*')
      .single();

    if (updateError) {
      console.error('レビュー更新エラー:', updateError);
      throw new Error(`レビュー更新エラー: ${updateError.message}`);
    }

    if (!updatedReview) {
      throw new Error('レビューが見つからないか、更新権限がありません');
    }

    console.log('✅ レビュー更新成功:', { reviewId: updatedReview.id });

    // ステップ2: プロフィール情報を別途取得
    try {
      const { data: profile, error: profileError } = await supabase
        .from('users_profiles')
        .select('username, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.warn('⚠️ プロフィール取得エラー:', profileError);
        // プロフィールなしでもレビューデータを返す
        return {
          ...updatedReview,
          users_profiles: null
        } as BookReview;
      }

      console.log('✅ プロフィール取得成功:', profile);
      
      // レビューデータにプロフィール情報を追加
      return {
        ...updatedReview,
        users_profiles: profile
      } as BookReview;

    } catch (profileError) {
      console.warn('⚠️ プロフィール処理エラー:', profileError);
      // プロフィールなしでもレビューデータを返す
      return {
        ...updatedReview,
        users_profiles: null
      } as BookReview;
    }

  } catch (error) {
    console.error('レビュー更新処理エラー:', error);
    throw error;
  }
};

// レビューを削除
export const deleteBookReview = async (reviewId: string) => {
  try {
    console.log('レビュー削除開始:', { reviewId });

    // セッションベースの認証確認
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      throw new Error('ログインが必要です');
    }

    // まず、削除対象のレビューが存在し、ユーザーが所有者かを確認
    const { data: reviewData, error: checkError } = await supabase
      .from('books_reviews')
      .select('id, user_id')
      .eq('id', reviewId)
      .eq('user_id', session.user.id)
      .single();

    if (checkError || !reviewData) {
      console.error('レビュー確認エラー:', checkError);
      throw new Error('レビューが見つからないか、削除権限がありません');
    }

    // レビューを削除
    const { error: deleteError } = await supabase
      .from('books_reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', session.user.id);

    if (deleteError) {
      console.error('レビュー削除エラー:', deleteError);
      throw new Error(`レビュー削除エラー: ${deleteError.message}`);
    }

    console.log('レビュー削除成功:', { reviewId });
  } catch (error) {
    console.error('レビュー削除処理エラー:', error);
    throw error;
  }
};

// レビューを取得（テスト用 - RLSバイパス）
export const getBookReviewsTest = async (bookId: string) => {
  try {
    console.log('=== テスト用レビュー取得開始 ===');
    console.log('BookID:', bookId);

    // 認証状態を確認
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('認証状態:', { 
      userId: user?.id, 
      email: user?.email,
      authError: authError?.message 
    });

    // シンプルなクエリでデータの存在確認
    const { data: simpleData, error: simpleError } = await supabase
      .from('books_reviews')
      .select('*')
      .eq('book_id', bookId);

    console.log('シンプルクエリ結果:', {
      dataCount: simpleData?.length || 0,
      error: simpleError?.message,
      data: simpleData
    });

    return simpleData || [];
  } catch (error) {
    console.error('テスト用レビュー取得エラー:', error);
    throw error;
  }
};

// レビューを取得（RLS無効化版）
export const getBookReviewsSimple = async (bookId: string): Promise<BookReview[]> => {
  try {
    console.log('=== シンプルレビュー取得開始 ===');
    console.log('BookID:', bookId);

    // シンプルなクエリでレビューを取得
    const { data, error } = await supabase
      .from('books_reviews')
      .select(`
        id,
        content,
        created_at,
        updated_at,
        user_id,
        book_id
      `)
      .eq('book_id', bookId)
      .order('created_at', { ascending: false });

    console.log('=== クエリ実行完了 ===');
    console.log('error:', error);
    console.log('data:', data);
    console.log('data type:', typeof data);
    console.log('data is array:', Array.isArray(data));
    console.log('data length:', data?.length);

    if (error) {
      console.error('シンプルレビュー取得エラー:', error);
      throw new Error(`レビュー取得エラー: ${error.message}`);
    }

    console.log('シンプルレビュー取得成功:', {
      reviewCount: data?.length || 0,
      rawData: data,
      dataType: typeof data,
      isArray: Array.isArray(data)
    });

    // データが存在しない場合の詳細ログ
    if (!data || data.length === 0) {
      console.log('=== データが空の理由を調査 ===');
      console.log('data:', data);
      console.log('data === null:', data === null);
      console.log('data === undefined:', data === undefined);
      console.log('Array.isArray(data):', Array.isArray(data));
      
      console.log('=== 空の配列を返します ===');
      return [];
    }

    // データが存在する場合の処理
    console.log('=== データが存在するため、プロフィール取得を開始 ===');
    console.log('取得したレビューデータ:', data);

    // ユーザープロフィール情報を別途取得
    const userIds = Array.from(new Set(data.map((review: any) => review.user_id)));
    console.log('取得対象ユーザーID:', userIds);
    
    const { data: profiles, error: profileError } = await supabase
      .from('users_profiles')
      .select('id, username, avatar_url')
      .in('id', userIds);

    console.log('プロフィール取得結果:', {
      profileCount: profiles?.length || 0,
      profiles: profiles,
      profileError: profileError?.message
    });

    if (profileError) {
      console.error('プロフィール取得エラー:', profileError);
    }

    // レビューとプロフィールを結合
    const reviewsWithProfiles = data.map((review: any) => {
      const profile = profiles?.find((profile: any) => profile.id === review.user_id);
      console.log(`レビュー ${review.id} のプロフィール結合:`, {
        reviewUserId: review.user_id,
        foundProfile: profile
      });
      
      return {
        ...review,
        users_profiles: profile || null
      };
    });

    console.log('プロフィール結合完了:', {
      finalCount: reviewsWithProfiles.length,
      finalData: reviewsWithProfiles
    });
    
    return reviewsWithProfiles as BookReview[];
  } catch (error) {
    console.error('シンプルレビュー取得処理エラー:', error);
    throw error;
  }
};

// データベース直接確認用（最もシンプル）
export const testDirectQuery = async (bookId: string) => {
  try {
    console.log('=== 直接クエリテスト開始 ===');
    console.log('BookID:', bookId);

    // 最もシンプルなクエリ
    const { data, error, count } = await supabase
      .from('books_reviews')
      .select('*', { count: 'exact' })
      .eq('book_id', bookId);

    console.log('直接クエリ結果:', {
      data: data,
      error: error,
      count: count,
      dataLength: data?.length,
      firstItem: data?.[0]
    });

    // 全てのレビューを取得（book_id条件なし）
    const { data: allData, error: allError } = await supabase
      .from('books_reviews')
      .select('*')
      .limit(10);

    console.log('全レビュー取得結果:', {
      allData: allData,
      allError: allError,
      allCount: allData?.length
    });

    return { data, error, count, allData };
  } catch (error) {
    console.error('直接クエリエラー:', error);
    throw error;
  }
};

// 最もシンプルなレビュー取得（デバッグ用）
export const getBookReviewsBasic = async (bookId: string) => {
  console.log('=== 基本レビュー取得開始 ===');
  console.log('BookID:', bookId);

  const { data, error } = await supabase
    .from('books_reviews')
    .select('*')
    .eq('book_id', bookId);

  console.log('基本レビュー取得結果:', {
    data: data,
    error: error,
    dataLength: data?.length,
    dataType: typeof data,
    isArray: Array.isArray(data)
  });

  return { data, error };
};

// 最もシンプルなレビュー投稿（デバッグ用）
export const addBookReviewSimple = async (bookId: string, content: string) => {
  console.log('=== シンプルレビュー投稿開始 ===');
  console.log('BookID:', bookId);
  console.log('Content:', content);

  try {
    // ステップ1: セッション確認（詳細ログ付き）
    console.log('🔐 セッション確認開始...');
    const sessionResult = await supabase.auth.getSession();
    console.log('セッション結果:', {
      hasData: !!sessionResult.data,
      hasSession: !!sessionResult.data?.session,
      hasUser: !!sessionResult.data?.session?.user,
      error: sessionResult.error?.message,
      userId: sessionResult.data?.session?.user?.id,
      email: sessionResult.data?.session?.user?.email
    });

    if (sessionResult.error) {
      console.error('❌ セッションエラー:', sessionResult.error);
      throw new Error(`セッションエラー: ${sessionResult.error.message}`);
    }

    if (!sessionResult.data?.session?.user) {
      console.error('❌ ユーザーが見つかりません');
      throw new Error('ログインが必要です');
    }

    const user = sessionResult.data.session.user;
    console.log('✅ セッション確認完了:', { userId: user.id });

    // ステップ2: 最もシンプルなレビュー挿入
    console.log('💾 レビュー挿入開始...');
    const insertResult = await supabase
      .from('books_reviews')
      .insert({
        book_id: bookId,
        user_id: user.id,
        content: content.trim()
      })
      .select('*')
      .single();

    console.log('挿入結果:', {
      hasData: !!insertResult.data,
      error: insertResult.error?.message,
      data: insertResult.data
    });

    if (insertResult.error) {
      console.error('❌ 挿入エラー:', insertResult.error);
      throw new Error(`挿入エラー: ${insertResult.error.message}`);
    }

    console.log('✅ レビュー挿入成功:', insertResult.data);
    return insertResult.data;

  } catch (error) {
    console.error('💥 シンプルレビュー投稿エラー:', error);
    throw error;
  }
}; 