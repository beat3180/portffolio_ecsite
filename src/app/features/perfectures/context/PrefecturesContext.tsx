import type React from 'react'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import * as prefectureService from '../api/prefectureService'
import type { Prefecture, PrefecturesContextProps } from '../types'
import { useErrorContext } from '../../../context/ErrorContext'

const PrefecturesContext = createContext<PrefecturesContextProps | undefined>(
  undefined,
)

export const PrefecturesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handleError } = useErrorContext()
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPrefectures = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await prefectureService.fetchPrefectures()
      if (error) {
        handleError(error, '都道府県データの取得')
        return
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

  return (
    <PrefecturesContext.Provider
      value={{ prefectures, setPrefectures, fetchPrefectures, isLoading }}
    >
      {children}
    </PrefecturesContext.Provider>
  )
}

export const usePrefecturesContext = () => {
  const context = useContext(PrefecturesContext)
  if (!context) {
    throw new Error(
      'usePrefecturesContext は PrefecturesProvider の内部で使用しなければなりません。',
    )
  }
  return context
}
