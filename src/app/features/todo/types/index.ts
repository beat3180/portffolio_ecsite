import type React from 'react'
export interface Todo {
  id?: number
  title: string
  description: string
  completed: boolean
}

export interface TodosContextProps {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  fetchTodos: () => Promise<void>
  isLoading: boolean
}

export interface TodoListProps {
  todos: Todo[]
}

export interface TodoItemProps {
  todo: Todo
}
