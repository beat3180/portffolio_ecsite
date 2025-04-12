import { useMemo, useState } from 'react'
import type React from 'react'
import {
  PREFECTURE_CSV_FILE_NAME,
  PREFECTURE_CSV_HEADERS,
  PREFECTURE_KEY_NAME,
} from '../../../config/file/prefectures'
import { useErrorContext } from '../../../context/ErrorContext'
import { downloadCSV, parseCSV } from '../../../lib/helper'
import type { Prefecture } from '../../../types/prefectures'

export default function usePrefectureList(prefectures: Prefecture[],
  setPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>
) {
  const { handleError } = useErrorContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [csvData, setCsvData] = useState<Prefecture[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const filteredPrefectures = useMemo(() => {
    return prefectures.filter((prefecture) =>
      [prefecture.name, prefecture.region, prefecture.capital].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
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
      const parsed = parseCSV<Prefecture>(text, PREFECTURE_KEY_NAME)
      setCsvData(parsed)
    }
    reader.readAsText(file)
  }

  const updatePrefectures = async () => {
    if (csvData.length === 0) {
      handleError('更新するデータがありません。')
      return
    }

    setIsLoading(true)
    const updatedPrefectures: Prefecture[] = [] // 更新された都道府県を格納する配列

    for (const updated of csvData) {
      const original = prefectures.find((p) => p.id === updated.id)
      if (!original) {
        console.warn(
          `ID ${updated.id} に一致する都道府県が見つかりませんでした。`,
        )
        continue
      }

      const hasChanges =
        original.name !== updated.name ||
        original.region !== updated.region ||
        original.capital !== updated.capital ||
        original.area !== updated.area ||
        original.population !== updated.population

      if (!hasChanges) continue

      try {
        const response = await fetch('/api/prefectures', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        })
        const data = await response.json()
        if (!response.ok) {
          handleError(data.error, '都道府県データの更新')
        } else {
          updatedPrefectures.push({ ...updated, image_url: original.image_url })
        }
      } catch (error) {
        handleError(error, '都道府県データの更新')
      }
    }

    if (updatedPrefectures.length > 0) {
      setPrefectures((prev) =>
        prev.map(
          (pref) => updatedPrefectures.find((u) => u.id === pref.id) || pref,
        ),
      )
    }

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
