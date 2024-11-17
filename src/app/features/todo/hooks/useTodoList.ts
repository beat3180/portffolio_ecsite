import { useState } from 'react'
import * as todoService from '../api/todoService'
import { useTodosContext } from '../context/TodosContext'

export const useTodoList = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const { todos, setTodos } = useTodosContext()

  const handleCreate = async () => {
    if (newTitle.trim() !== '' && newDescription.trim() !== '') {
      try {
        const createdTodo = await todoService.createTodo({
          title: newTitle,
          description: newDescription,
          completed: false,
        })
        if (createdTodo) setTodos((prevTodos) => [...prevTodos, createdTodo])
        setNewTitle('')
        setNewDescription('')
      } catch (error) {
        console.error('Error creating todo:', error)
      }
    }
  }

  return {
    todos,
    newTitle,
    newDescription,
    setNewTitle,
    setNewDescription,
    handleCreate,
  }
}
