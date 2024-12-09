import { useState } from 'react'
import * as todoService from '../api/todoService'
import { useTodosContext } from '../context/TodosContext'
import { useErrorContext } from '../../../context/ErrorContext'

export const useTodoList = () => {
  const { handleError } = useErrorContext()
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const { setTodos } = useTodosContext()

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
        setTodos((prevTodos) => [...prevTodos, createdTodo]) // createdTodo のみを追加
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
