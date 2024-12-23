import type React from 'react'
export interface Prefecture {
  id?: number
  name: string
  region: string
  capital: string
  area: number
  population: number
  image_url: string
}

export interface PrefecturesContextProps {
  prefectures: Prefecture[]
  setPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>
  fetchPrefectures: () => Promise<void>
  isLoading: boolean
}

export interface PrefectureListProps {
  prefectures: Prefecture[]
}

export interface PrefectureItemProps {
  prefecture: Prefecture
}
