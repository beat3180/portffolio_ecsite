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
}

export interface TodoItemProps {
  todo: Todo
}
