import type { FC } from 'react'
import Button from '../../../components/elements/Button'
import type { TodoItemProps } from '../types'
import { useTodoItem } from '../hooks/useTodoItem'

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const {
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
  } = useTodoItem(todo)

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
            <Button
              variant="danger"
              onClick={() => todo.id && handleDelete(todo.id)}
            >
              削除
            </Button>
          </>
        )}
      </td>
    </tr>
  )
}

export default TodoItem
