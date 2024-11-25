'use client'

import { TodosProvider, useTodosContext } from './context/TodosContext'
import TodoList from './components/TodoList'
import './styles/todo.css'
import Loading from '../../components/common/Loading'

// todoデータcontext
export default function TodoPage() {
  return (
    <TodosProvider>
      <TodoListWrapper />
    </TodosProvider>
  )
}

// todo画面コンポーネント
function TodoListWrapper() {
  const { todos } = useTodosContext()

  if (!todos.length) return <Loading />

  return (
    <div>
      <h1 className="todo-title">Todo List</h1>
      <TodoList />
    </div>
  )
}
