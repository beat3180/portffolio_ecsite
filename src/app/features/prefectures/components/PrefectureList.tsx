import type { PrefectureListProps } from '../types'
import PrefectureItem from './PrefectureItem'
import TextField from '../../../components/elements/TextField'
import usePrefectureList from '../hooks/usePrefectureList'

const PrefectureList = ({ prefectures }: PrefectureListProps) => {
  const { searchTerm, filteredPrefectures, handleSearchChange } =
    usePrefectureList(prefectures)

  return (
    <div className="prefecture-wrapper">
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-full mb-4">
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="都道府県を検索..."
          />
        </div>
        <div className="prefecture-list">
          {filteredPrefectures.map((prefecture) => (
            <PrefectureItem key={prefecture.id} prefecture={prefecture} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrefectureList
