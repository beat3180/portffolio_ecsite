import { useState, useEffect } from 'react'
import type { Prefecture } from '../types'
import type React from 'react'
import { PREFECTURE_CSV_HEADERS, PREFECTURE_CSV_FILE_NAME } from '../../../config/file/prefectures'
import { downloadCSV } from '../../../lib/helper'


export default function usePrefectureList(prefectures: Prefecture[]) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPrefectures, setFilteredPrefectures] =
    useState<Prefecture[]>(prefectures)

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

  return {
    searchTerm,
    filteredPrefectures,
    handleSearchChange,
    handleDownloadCSV,
  }
}
