import { useEffect, useState } from 'react'
import type React from 'react'
import {
  PREFECTURE_CSV_FILE_NAME,
  PREFECTURE_CSV_HEADERS,
  PREFECTURE_KEY_NAME,
} from '../../../config/file/prefectures'
import { useErrorContext } from '../../../context/ErrorContext'
import { downloadCSV, parseCSV } from '../../../lib/helper'
import type { Prefecture } from '../../../types/prefectures'

export default function usePrefectureList(prefectures: Prefecture[]) {
  const { handleError } = useErrorContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPrefectures, setFilteredPrefectures] =
    useState<Prefecture[]>(prefectures)
  const [parsedData, setParsedData] = useState<Prefecture[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const results = prefectures.filter(
      (prefecture) =>
        prefecture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prefecture.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prefecture.capital.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredPrefectures(results)
  }, [prefectures, searchTerm])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleDownloadCSV = () => {
    // データがない場合、処理を終了
    if (filteredPrefectures.length === 0) {
      return
    }

    downloadCSV(
      filteredPrefectures,
      PREFECTURE_CSV_HEADERS,
      PREFECTURE_CSV_FILE_NAME,
      'yyyyMMddHHmmss',
    )
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const updatedData = parseCSV<Prefecture>(text, PREFECTURE_KEY_NAME)
      setParsedData(updatedData)
    }
    reader.readAsText(file)
  }

  const updatePrefectures = async () => {
    if (parsedData.length === 0) {
      handleError('更新するデータがありません。')
      return
    }

    setIsLoading(true)
    const updatedPrefectures: Prefecture[] = [] // 更新された都道府県を格納する配列

    for (const updatedPrefecture of parsedData) {
      const originalPrefecture = prefectures.find(
        (p) =>
          updatedPrefecture.id !== undefined && p.id === updatedPrefecture.id,
      )

      if (!originalPrefecture) {
        console.warn(
          `ID ${updatedPrefecture.id} に一致する都道府県が見つかりませんでした。`,
        )
        continue // 一致しない場合は次のループへ
      }

      const hasChanges =
        originalPrefecture.name !== updatedPrefecture.name ||
        originalPrefecture.region !== updatedPrefecture.region ||
        originalPrefecture.capital !== updatedPrefecture.capital ||
        originalPrefecture.area !== updatedPrefecture.area ||
        originalPrefecture.population !== updatedPrefecture.population

      if (hasChanges) {
        try {
          const response = await fetch('/api/prefectures', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPrefecture),
          })
          const data = await response.json()
          console.log('APIレスポンス:', data)
          if (!response.ok) {
            handleError(data.error, '都道府県データの更新')
          } else {
            // image_urlはoriginalPrefectureから取得
            updatedPrefectures.push({
              ...updatedPrefecture,
              image_url: originalPrefecture.image_url, // image_urlを保持
            })
          }
        } catch (error) {
          handleError(error, '都道府県データの更新')
        }
      }
    }

    // 更新された都道府県をfilteredPrefecturesに設定
    setFilteredPrefectures((prev) => {
      return prev.map((prefecture) => {
        const updated = updatedPrefectures.find((p) => p.id === prefecture.id)
        return updated ? updated : prefecture // 更新されたものを返す
      })
    })

    setIsLoading(false)
  }

  return {
    searchTerm,
    filteredPrefectures,
    handleSearchChange,
    handleDownloadCSV,
    handleFileChange,
    updatePrefectures,
    isLoading,
  }
}
