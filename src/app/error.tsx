// app/error.tsx または app/feature/error.tsx など
'use client'

import { useEffect } from 'react'
import Button from './components/elements/Button'
import './styles/error.css'

export default function ErrorBoundary({
  error,
  reset,
}: { error: Error; reset: () => void }) {
  useEffect(() => {
    // ログ送信など
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <Button variant="primary" onClick={() => reset()}>
        再試行する
      </Button>
    </div>
  )
}
