import type React from 'react'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import * as todoService from '../api/todoService'
import type { Todo ,TodosContextProps } from '../types'
import { useErrorContext } from '../../../context/ErrorContext'

// 初期値
const TodosContext = createContext<TodosContextProps | undefined>(undefined)

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handleError } = useErrorContext()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTodos = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await todoService.fetchTodos()
      if (error) {
        handleError(error, 'Todoの取得')
        return // エラー発生時は早期リターン
      }
      setTodos(data)
    } catch (error) {
      handleError(error, 'Todoの取得')
    } finally {
      setIsLoading(false) // データ取得完了後にローディング状態を false に設定
    }
  }, [handleError])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodosContext.Provider value={{ todos, setTodos, fetchTodos, isLoading }}>
      {children}
    </TodosContext.Provider>
  )
}

export const useTodosContext = () => {
  const context = useContext(TodosContext)
  if (!context) {
    throw new Error(
      'useTodosContext は TodosProvider の内部で使用しなければなりません。',
    )
  }
  return context
}
