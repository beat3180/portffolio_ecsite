import { useState } from 'react'
import type { FC } from 'react'
import Button from '../../../components/elements/button'
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
    <tr className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <span>{todo.title}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <span>{todo.description}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <Button variant="primary" onClick={handleSave}>
              保存
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              キャンセル
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleEdit}>
              編集
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              削除
            </Button>
          </>
        )}
      </td>
    </tr>
  )
}

export default TodoItem
