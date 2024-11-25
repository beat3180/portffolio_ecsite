import { supabase } from '../../../lib/supabaseClient'
import type { Todo } from '../types'

export const fetchTodos = async (): Promise<{
  data: Todo[]
  error: unknown
}> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .not('title', 'is', null)
    if (error) {
      return { data: [], error }
    }
    return { data: data ?? [], error: null }
  } catch (error) {
    return { data: [], error }
  }
}

export const createTodo = async (
  newTodo: Todo,
): Promise<{ data: Todo | null; error: unknown }> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([newTodo])
      .select()

    return { data: data?.[0] ?? null, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const updateTodo = async (
  updatedTodo: Todo,
): Promise<{ data: boolean; error: unknown }> => {
  try {
    const { error } = await supabase
      .from('todos')
      .update(updatedTodo)
      .eq('id', updatedTodo.id)
    return { data: !error, error }; // error があれば false、なければ true を返す
  } catch (error) {
    return { data: false, error }
  }
}

export const deleteTodo = async (
  id: number,
): Promise<{ data: boolean; error: unknown }> => {
  try {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    return { data: !error, error }
  } catch (error) {
    return { data: false, error }
  }
}
