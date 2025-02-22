import { useState } from 'react'
import type React from 'react'
import { useErrorContext } from '../../../context/ErrorContext'
import * as todoService from '../api/todoService'
import type { Todo } from '../types'

export const useTodoList = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  const { handleError } = useErrorContext()
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const handleCreate = async () => {
    if (newTitle.trim() !== '' && newDescription.trim() !== '') {
      try {
        const { data: createdTodo, error } = await todoService.createTodo({
          title: newTitle,
          description: newDescription,
          completed: false,
        })

        if (error) {
          handleError(error, 'Todoの作成')
          return
        }

        if (createdTodo) {
          setTodos((prevTodos) => [...prevTodos, createdTodo])
        }

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
