import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 環境変数が設定されているかチェック
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('エラー: supabaseの環境変数が設定されていません。', { supabaseUrl, supabaseAnonKey })
  throw new Error('supabaseのURLと匿名キーは必須です。')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
