import * as prefectureService from '../api/prefectureService'
import type { Prefecture } from '../types'
import { useEffect, useState } from 'react'
import { useErrorContext } from '../../../context/ErrorContext'


export const useFetchPrefecture = (id: number) => {
  const [prefecture, setPrefecture] = useState<Prefecture | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { handleError } = useErrorContext()

  useEffect(() => {
    const fetchPrefecture = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await prefectureService.fetchPrefectureById(id)
        if (error) {
          handleError(error, `ID ${id} の都道府県データの取得`)
          return
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
