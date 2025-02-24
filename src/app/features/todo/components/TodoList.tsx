import Button from '../../../components/elements/Button'
import { useTodoList } from '../hooks/useTodoList'
import type { TodoListProps } from '../types'
import TodoItem from './TodoItem'

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const {
    newTitle,
    newDescription,
    setNewTitle,
    setNewDescription,
    handleCreate,
  } = useTodoList(setTodos)

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

      {todos.length > 0 ? (
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
                <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
              ))}
            </tbody>
          </table>
        </ul>
      ) : (
        <p>データがありません</p>
      )}
    </div>
  )
}
