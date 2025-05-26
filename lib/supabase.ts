import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

// 統一されたSupabaseクライアント（シングルトン）
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// ユーザープロフィールを作成または更新する関数
const upsertProfile = async (user: { id: string; email?: string | undefined }) => {
  try {
    // まず既存のプロフィールを確認
    const { data: existingProfile } = await supabase
      .from('users_profiles')
      .select()
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      // プロフィールが存在しない場合は新規作成
      const { error } = await supabase.from('users_profiles').insert({
        id: user.id,
        username: user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`,
        // デフォルトのアバターURLを設定することもできます
        // avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      });

      if (error) {
        console.error('プロフィール作成エラー:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('プロフィール更新エラー:', error);
    throw error;
  }
};

// 認証状態の変更を監視し、必要に応じてプロフィールを作成
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      await upsertProfile(session.user);
    }
  });

  // 現在のセッションをチェック
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      upsertProfile(session.user);
    }
  });
}

// 認証関連のユーティリティ関数
export const getURL = () => {
  let url = siteUrl ?? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ?? 'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const signInWithEmail = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getURL()}auth/callback`
    }
  });
  return { error };
};