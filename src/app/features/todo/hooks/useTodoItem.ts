import { useState } from 'react'
import { useTodosContext } from '../context/TodosContext'
import * as todoService from '../api/todoService'
import type { Todo } from '../types'
import { useErrorContext } from '../../../context/ErrorContext'

export const useTodoItem = (initialTodo: Todo) => {
  const { handleError } = useErrorContext()
  const { todos, setTodos } = useTodosContext()

  // ローカル状態管理
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(initialTodo.title)
  const [editedDescription, setEditedDescription] = useState(
    initialTodo.description,
  )

  // 更新処理
  const handleUpdate = async (updatedTodo: Todo) => {
    try {
      const success = await todoService.updateTodo(updatedTodo)
      if (success) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        )
      } else {
        handleError(new Error('Todoの更新に失敗しました。'), 'Todoの更新')
      }
    } catch (error) {
      handleError(error, 'Todoの更新')
    }
  }

  // 削除処理
  const handleDelete = async (id: number) => {
    try {
      const success = await todoService.deleteTodo(id)
      if (success) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
      } else {
        handleError(new Error('Todoの削除に失敗しました。'), 'Todoの削除')
      }
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
    todos,
    setTodos,
    isEditing,
    editedTitle,
    setEditedTitle,
    editedDescription,
    setEditedDescription,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    handleToggleComplete,
  }
}
