import { useEffect, useState } from 'react'
import { useErrorContext } from '../../../context/ErrorContext'
import type { Prefecture } from '../types'

export const useFetchPrefecture = (id: number) => {
  const [prefecture, setPrefecture] = useState<Prefecture | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { handleError } = useErrorContext()

  useEffect(() => {
    const fetchPrefecture = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/prefectures', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        })
        const data = await response.json()
        if (!response.ok) {
          return handleError(data.error || `ID ${id} の都道府県データの取得に失敗しました。`)
        }
        setPrefecture(data ?? null)
      } catch (error) {
        handleError(error, `ID ${id} の都道府県データの取得`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrefecture()
  }, [id, handleError])

  return { isLoading, prefecture }
}
