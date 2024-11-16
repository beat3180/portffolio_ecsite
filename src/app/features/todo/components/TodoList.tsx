import { useState } from 'react'
import Button from '../../../components/elements/button'
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
    <div className="todo-list-container">
      <div className="add-task-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="タイトル"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="詳細"
        />
        <Button variant="primary" onClick={handleCreate}>
          タスクを追加
        </Button>
      </div>

      <ul className="todo-items">
        <table>
          <thead>
            <tr>
              <th>完了</th>
              <th>タイトル</th>
              <th>詳細</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </ul>
    </div>
  )
}
