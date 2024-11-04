import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 環境変数が設定されているかチェック
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase environment variables are not set.', { supabaseUrl, supabaseAnonKey })
  throw new Error('supabaseUrl and supabaseAnonKey are required.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
