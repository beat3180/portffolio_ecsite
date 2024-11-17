import { useState } from 'react'
import { useTodosContext } from '../context/TodosContext'
import * as todoService from '../api/todoService'
import type { Todo } from '../types'

export const useTodoItem = (initialTodo: Todo) => {
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
      await todoService.updateTodo(updatedTodo)
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      )
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // 削除処理
  const handleDelete = async (id: number) => {
    try {
      await todoService.deleteTodo(id)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
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



// export const useTodoItem = (
//   initialTodo: Todo,
//   onUpdate: (updatedTodo: Todo) => void,
// ) => {
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedTitle, setEditedTitle] = useState(initialTodo.title)
//   const [editedDescription, setEditedDescription] = useState(
//     initialTodo.description,
//   )

//   const handleEdit = () => {
//     setIsEditing(true)
//   }

//   const handleSave = () => {
//     onUpdate({
//       ...initialTodo,
//       title: editedTitle,
//       description: editedDescription,
//     })
//     setIsEditing(false)
//   }

//   const handleCancel = () => {
//     setEditedTitle(initialTodo.title)
//     setEditedDescription(initialTodo.description)
//     setIsEditing(false)
//   }

//   return {
//     isEditing,
//     editedTitle,
//     setEditedTitle,
//     editedDescription,
//     setEditedDescription,
//     handleEdit,
//     handleSave,
//     handleCancel,
//   }
// }
