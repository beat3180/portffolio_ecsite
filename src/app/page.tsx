import Link from 'next/link'
import Button from './components/elements/Button'
import './styles/top.css'

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="button-container">
          <Link href="/features/todo">
            <Button variant="primary">TodoList</Button>
          </Link>
          <Link href="/features/todo">
            <Button variant="primary">都道府県一覧</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
