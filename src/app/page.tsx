import Link from 'next/link'
import Header from './components/layout/header'

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Link
          href="/features/todo"
          className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          TodoList
        </Link>
      </main>
    </div>
  )
}
