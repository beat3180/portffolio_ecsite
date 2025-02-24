'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Button from '../../../components/elements/Button'

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-4 relative">
      <nav className="container mx-auto px-4 flex items-center justify-start">
        {pathname !== '/' && (
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="absolute left-4"
          >
            ←
          </Button>
        )}
        <Link href="/" className="text-xl font-bold">
          My Website
        </Link>
      </nav>
    </header>
  )
}

export default Header
