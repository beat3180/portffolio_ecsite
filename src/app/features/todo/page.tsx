'use client'

import { useEffect, useState } from 'react'
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './api/actions'
import TodoList from './components/TodoList'
import type { Todo } from './types'
import './styles/todo.css'
import Loading from '../../components/common/loading'

export default function TodoPage() {
  const [todosData, setTodosData] = useState<Todo[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTodosData = async () => {
      setLoading(true)
      const { data, error } = await fetchTodos()
      if (error) {
        console.error('Error fetching todos:', error)
        setError(error) // エラーが発生した場合に setError を呼び出す
      } else {
        setTodosData(data)
      }
      setLoading(false)
    }
    fetchTodosData()
  }, [])

  if (error) {
    return <div>Error fetching todos: {error.message}</div>
  }

    if (loading) {
    return <Loading />
  }

  if (!todosData) {
    return <div>No todos found.</div>
  }

  const handleCreate = async (newTodo: Todo) => {
    setLoading(true) // create開始時にローディング状態にする
    const createdTodo = await createTodo(newTodo)
    if (createdTodo) {
      setTodosData([...todosData, createdTodo])
    }
    setLoading(false) // create終了後にローディング状態を解除
  }

  const handleUpdate = async (updatedTodo: Todo) => {
    setLoading(true) // update開始時にローディング状態にする
    const success = await updateTodo(updatedTodo)
    if (success) {
      setTodosData(
        todosData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      )
    }
    setLoading(false) // update終了後にローディング状態を解除
  }

  const handleDelete = async (id: number | undefined) => {
    if (id !== undefined) {
      setLoading(true) // delete開始時にローディング状態にする
      const success = await deleteTodo(id)
      if (success) {
        setTodosData(todosData.filter((todo) => todo.id !== id))
      }
      setLoading(false) // delete終了後にローディング状態を解除
    }
  }
  return (
    <div>
      <h1 className="todo-title">Todo List</h1>
      <TodoList
        todos={todosData}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}
