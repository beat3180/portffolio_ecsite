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

const TodosContext = createContext<TodosContextProps | undefined>(undefined)

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = useCallback(async () => {
    try {
      const { data, error } = await todoService.fetchTodos()
      if (error) {
        throw error
      }
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodosContext.Provider value={{ todos, setTodos, fetchTodos }}>
      {children}
    </TodosContext.Provider>
  )
}

export const useTodosContext = () => {
  const context = useContext(TodosContext)
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider')
  }
  return context
}
