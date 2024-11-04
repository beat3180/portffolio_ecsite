'use client'

import { useEffect, useState } from 'react'
import Header from '../../components/layout/header'
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './api/actions'
import TodoList from './components/TodoList'
import type { Todo } from './types'

export default function TodoPage() {
  const [todosData, setTodosData] = useState<Todo[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTodosData = async () => {
      const { data, error } = await fetchTodos()
      if (error) {
        console.error('Error fetching todos:', error)
        setError(error) // エラーが発生した場合に setError を呼び出す
      } else {
        setTodosData(data)
      }
    }
    fetchTodosData()
  }, [])

  if (error) {
    return <div>Error fetching todos: {error.message}</div>
  }

  if (!todosData) {
    return <div>Loading...</div> // データがフェッチされるまでローディングを表示
  }

  const handleCreate = async (newTodo: Todo) => {
    const createdTodo = await createTodo(newTodo)
    if (createdTodo) {
      setTodosData([...todosData, createdTodo])
    }
  }

  const handleUpdate = async (updatedTodo: Todo) => {
    const success = await updateTodo(updatedTodo)
    if (success) {
      setTodosData(
        todosData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      )
    }
  }

  const handleDelete = async (id: number | undefined) => {
    if (id !== undefined) {
      const success = await deleteTodo(id)
      if (success) {
        setTodosData(todosData.filter((todo) => todo.id !== id))
      }
    }
  }

  return (
    <div>
      <Header />
      <h1>Todo List</h1>
      <TodoList
        todos={todosData}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}
