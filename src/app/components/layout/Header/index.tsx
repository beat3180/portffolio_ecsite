'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Button from '../../../components/elements/Button'

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-4">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          My Website
        </Link>
        {pathname !== '/' && (
          <Button variant="secondary" onClick={() => router.back()}>
            ←
          </Button>
        )}
      </nav>
    </header>
  )
}

export default Header
