import { useCallback, useEffect, useState } from 'react'
import { useErrorContext } from '../../../context/ErrorContext'
import * as todoService from '../api/todoService'
import type { Todo } from '../types'

export const useTodo = () => {
  const { handleError } = useErrorContext()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTodos = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await todoService.fetchTodos()
      if (error) {
        handleError(error, 'Todoの取得')
        return
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
