'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // URLからハッシュパラメータを取得して処理
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // 認証成功時のリダイレクト
        router.push('/dashboard'); // または適切なページへ
      } else {
        // 認証失敗時のリダイレクト
        router.push('/auth/signin');
      }
    });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">認証処理中...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
} 