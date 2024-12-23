import { useState, useEffect } from 'react'
import type { Prefecture } from '../types'
import type React from 'react'

const usePrefectureList = (prefectures: Prefecture[]) => {
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

  return { searchTerm, filteredPrefectures, handleSearchChange }
}

export default usePrefectureList
