
export interface Prefecture {
  id?: number
  name: string
  region: string
  capital: string
  area: number
  population: number
  image_url: string
}

export interface PrefectureListProps {
  prefectures: Prefecture[]
}

export interface PrefectureItemProps {
  prefecture: Prefecture
}
