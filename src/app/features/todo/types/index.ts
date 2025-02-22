import type React from 'react'

export interface Todo {
  id?: number
  title: string
  description: string
  completed: boolean
}

export interface TodoListProps {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export interface TodoItemProps {
  todo: Todo
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
