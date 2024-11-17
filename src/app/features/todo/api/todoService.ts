import { supabase } from '../../../lib/supabaseClient'
import type { Todo } from '../types'

// 共通のエラー処理関数
const handleError = (error: Error | null, action: string) => {
  if (error) {
    console.error(`Error ${action} todo:`, error)
    return true // エラーが発生した場合trueを返す
  }
  return false // エラーが発生しなかった場合falseを返す
}

export const fetchTodos = async (): Promise<{
  data: Todo[]
  error: Error | null
}> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .not('title', 'is', null)
  return { data: data ?? [], error }
}

export const createTodo = async (newTodo: Todo): Promise<Todo | null> => {
  const { data, error } = await supabase
    .from('todos')
    .insert([newTodo])
    .select()
  if (handleError(error, 'creating')) return null
  return data?.[0] ?? null // dataが存在しない場合もnullを返す
}

export const updateTodo = async (updatedTodo: Todo): Promise<boolean> => {
  const { error } = await supabase
    .from('todos')
    .update(updatedTodo)
    .eq('id', updatedTodo.id)
  return !handleError(error, 'updating') // エラー処理関数の結果を反転
}

export const deleteTodo = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from('todos').delete().eq('id', id)
  return !handleError(error, 'deleting') // エラー処理関数の結果を反転
}
