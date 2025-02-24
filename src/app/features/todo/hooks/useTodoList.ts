import { useState } from 'react'
import type React from 'react'
import { useErrorContext } from '../../../context/ErrorContext'
import type { Todo } from '../../../types/todo'

export const useTodoList = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  const { handleError } = useErrorContext()
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const handleCreate = async () => {
    if (newTitle.trim() !== '' && newDescription.trim() !== '') {
      try {
        const response = await fetch('/api/todo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            completed: false,
          }),
        })
        const data = await response.json()
        if (!response.ok) {
          return handleError(data.error, 'Todoの作成')
        }
        setTodos((prevTodos) => [...prevTodos, data])
        setNewTitle('')
        setNewDescription('')
      } catch (error) {
        handleError(error, 'Todoの作成')
      }
    }
  }

  return {
    newTitle,
    newDescription,
    setNewTitle,
    setNewDescription,
    handleCreate,
  }
}
