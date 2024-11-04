import { supabase } from '../../../lib/supabaseClient'
import type { Todo } from './../types'

export const fetchTodos = async (): Promise<{
  data: Todo[] | null
  error: Error | null
}> => {
  const { data, error } = await supabase.from('todos').select('*')
  return { data, error }
}

export const createTodo = async (newTodo: Todo): Promise<Todo | null> => {
  const { data, error } = await supabase
    .from('todos')
    .insert([newTodo])
    .select()

  if (error) {
    console.error('Error creating todo:', error, error.details)
    return null
  }

  return data[0]
}

export const updateTodo = async (updatedTodo: Todo): Promise<boolean> => {
  const { error } = await supabase
    .from('todos')
    .update(updatedTodo)
    .eq('id', updatedTodo.id)

  if (error) {
    console.error('Error updating todo:', error)
    return false
  }

  return true
}

export const deleteTodo = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from('todos').delete().eq('id', id)

  if (error) {
    console.error('Error deleting todo:', error)
    return false
  }

  return true
}
