import { useCallback, useEffect, useState } from 'react'
import { useErrorContext } from '../../../context/ErrorContext'
import type { Prefecture } from '../../../types/prefectures'

export const usePrefecture = () => {
  const { handleError } = useErrorContext()
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPrefectures = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/prefectures')
      const data = await response.json()
      if (!response.ok) {
        return handleError(data.error || '都道府県データの取得に失敗しました。')
      }
      setPrefectures(data ?? [])
    } catch (error) {
      handleError(error, '都道府県データの取得')
    } finally {
      setIsLoading(false)
    }
  }, [handleError])

  useEffect(() => {
    fetchPrefectures()
  }, [fetchPrefectures])

  return {
    prefectures,
    setPrefectures,
    fetchPrefectures,
    isLoading,
  }
}
