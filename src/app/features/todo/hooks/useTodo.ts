import { useCallback, useEffect, useState } from 'react'
import { useErrorContext } from '../../../context/ErrorContext'
import type { Todo } from '../types'

export const useTodo = () => {
  const { handleError } = useErrorContext()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTodos = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/todo')
      const data = await response.json()
      if (!response.ok) {
        return handleError(data.error, 'Todoの取得')
      }
      setTodos(data)
    } catch (error) {
      handleError(error, 'Todoの取得')
    } finally {
      setIsLoading(false)
    }
  }, [handleError])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return {
    todos,
    setTodos,
    fetchTodos,
    isLoading,
  }
}
