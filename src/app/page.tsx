import Link from 'next/link'
import Button from './components/elements/Button'

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Link href="/features/todo">
          <Button variant="primary">TodoList</Button>
        </Link>
      </main>
    </div>
  )
}
