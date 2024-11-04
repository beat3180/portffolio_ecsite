export interface Todo {
  id?: number
  title: string
  description: string
  completed: boolean
}

export interface TodoItemProps {
  todo: Todo
  onUpdate: (updatedTodo: Todo) => void
  onDelete: (id: number | undefined) => void
}

export interface TodoListProps {
  todos: Todo[]
  onCreate: (newTodo: Todo) => void
  onUpdate: (updatedTodo: Todo) => void
  onDelete: (id: number | undefined) => void
}
