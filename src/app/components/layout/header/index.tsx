import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-4">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          My Website
        </Link>
      </nav>
    </header>
  )
}

export default Header
