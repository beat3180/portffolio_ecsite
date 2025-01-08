import type { PrefectureListProps } from '../types'
import PrefectureItem from './PrefectureItem'
import TextField from '../../../components/elements/TextField'
import usePrefectureList from '../hooks/usePrefectureList'
import Button from '../../../components/elements/Button'

const PrefectureList = ({ prefectures }: PrefectureListProps) => {
  const {
    searchTerm,
    filteredPrefectures,
    handleSearchChange,
    handleDownloadCSV,
  } = usePrefectureList(prefectures)

  return (
    <div className="prefecture-wrapper">
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-full mb-4 gap-4">
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="都道府県を検索..."
          />
          <Button variant="secondary" onClick={handleDownloadCSV}>
            出力
          </Button>
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
