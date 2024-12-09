import type { PrefectureListProps } from '../types'
import PrefectureItem from './PrefectureItem'


const PrefectureList = ({
  prefectures,
}: PrefectureListProps) => {
  return (
    <div className="prefecture-list">
      {prefectures.map((prefecture) => (
        <PrefectureItem key={prefecture.id} prefecture={prefecture} />
      ))}
    </div>
  )
}

export default PrefectureList
