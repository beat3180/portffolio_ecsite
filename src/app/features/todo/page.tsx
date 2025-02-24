'use client'

import TodoList from './components/TodoList'
import '../../styles/todo.css'
import { useTodo } from './hooks/useTodo'
import Loading from '../../components/common/Loading'


// todo画面コンポーネント
export default function TodoPage() {
    const { todos, setTodos, isLoading } = useTodo()

    if (isLoading) return <Loading />

    return (
      <div>
        <h1 className="todo-title">Todo List</h1>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    )
}
