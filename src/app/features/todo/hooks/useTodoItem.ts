import { useState } from 'react'
import type React from 'react'
import { useErrorContext } from '../../../context/ErrorContext'
import type { Todo } from '../types'

export const useTodoItem = (
  initialTodo: Todo,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  const { handleError } = useErrorContext()

  // ローカル状態管理
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(initialTodo.title)
  const [editedDescription, setEditedDescription] = useState(
    initialTodo.description,
  )

  // 更新処理
  const handleUpdate = async (updatedTodo: Todo) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      })
      const data = await response.json()
      if (!response.ok) {
        return handleError(data.error, 'Todoの更新')
      }
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      )
    } catch (error) {
      handleError(error, 'Todoの更新')
    }
  }

  // 削除処理
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()
      if (!response.ok) {
        return handleError(data.error, 'Todoの削除')
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      handleError(error, 'Todoの削除')
    }
  }

  // 編集処理
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    handleUpdate({
      ...initialTodo,
      title: editedTitle,
      description: editedDescription,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(initialTodo.title)
    setEditedDescription(initialTodo.description)
    setIsEditing(false)
  }

  // 完了状態のトグル
  const handleToggleComplete = () => {
    handleUpdate({ ...initialTodo, completed: !initialTodo.completed })
  }

  return {
    isEditing,
    editedTitle,
    setEditedTitle,
    editedDescription,
    setEditedDescription,
    handleEdit,
    handleSave,
    handleCancel,
    handleToggleComplete,
    handleDelete,
  }
}
