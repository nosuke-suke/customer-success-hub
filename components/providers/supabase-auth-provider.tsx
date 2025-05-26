'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 現在のセッションを取得
    const getSession = async () => {
      try {
        console.log('=== セッション取得開始 ===');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('セッション取得結果:', { 
          hasSession: !!session,
          userId: session?.user?.id,
          userEmail: session?.user?.email,
          accessToken: session?.access_token ? 'あり' : 'なし',
          refreshToken: session?.refresh_token ? 'あり' : 'なし',
          expiresAt: session?.expires_at,
          error: error?.message
        });
        
        setUser(session?.user ?? null);
        setLoading(false);

        if (error) {
          console.error('セッション取得エラー:', error);
        } else if (session?.user) {
          console.log('有効なセッションが見つかりました:', session.user.id);
        } else {
          console.log('セッションが存在しません（未ログイン状態）');
        }
      } catch (error) {
        console.error('セッション取得処理エラー:', error);
        setLoading(false);
      }
    };

    // 初期セッションを取得
    getSession();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log('=== 認証状態変更 ===');
      console.log('イベント:', event);
      console.log('セッション情報:', {
        hasSession: !!session,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        accessToken: session?.access_token ? 'あり' : 'なし'
      });
      
      setUser(session?.user ?? null);
      setLoading(false);
      
      // イベント別の処理
      switch (event) {
        case 'SIGNED_IN':
          console.log('ユーザーがログインしました:', session?.user?.email);
          break;
        case 'SIGNED_OUT':
          console.log('ユーザーがログアウトしました');
          break;
        case 'TOKEN_REFRESHED':
          console.log('トークンが更新されました');
          break;
        case 'USER_UPDATED':
          console.log('ユーザー情報が更新されました');
          break;
        default:
          console.log('その他の認証イベント:', event);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
} 