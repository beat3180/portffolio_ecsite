import { useState } from 'react'
import type { TodoListProps } from './../types'
import TodoItem from './TodoItem'

export default function TodoList({
  todos,
  onCreate,
  onUpdate,
  onDelete,
}: TodoListProps) {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const handleCreate = () => {
    if (newTitle.trim() !== '' && newDescription.trim() !== '') {
      onCreate({
        title: newTitle,
        description: newDescription,
        completed: false,
      })
      setNewTitle('')
      setNewDescription('')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="button" onClick={handleCreate}>
        Add Task
      </button>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}
