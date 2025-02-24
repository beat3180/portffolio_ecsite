'use client'

import TodoList from './components/TodoList'
import '../../styles/todo.css'
import { useTodo } from './hooks/useTodo'

// todo画面コンポーネント
export default function TodoPage() {
  const { todos, setTodos } = useTodo()

  return (
    <div>
      <h1 className="todo-title">Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}
