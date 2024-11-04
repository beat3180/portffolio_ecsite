import { useState } from 'react'
import type { FC } from 'react'
import type { TodoItemProps } from './../types'


const TodoItem: FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)
  const [editedDescription, setEditedDescription] = useState(todo.description)

  const handleToggleComplete = () => {
    onUpdate({ ...todo, completed: !todo.completed })
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate({ ...todo, title: editedTitle, description: editedDescription })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(todo.title)
    setEditedDescription(todo.description)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(todo.id)
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.title}
          </span>
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
