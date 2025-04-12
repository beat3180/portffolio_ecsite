import Loading from '../../../components/common/Loading'
import Button from '../../../components/elements/Button'
import FileInput from '../../../components/elements/FileInput'
import TextField from '../../../components/elements/TextField'
import type { PrefectureListProps } from '../../../types/prefectures'
import usePrefectureList from '../hooks/usePrefectureList'
import PrefectureItem from './PrefectureItem'

export default function PrefectureList({
  prefectures,
  setPrefectures
}: PrefectureListProps) {
  const {
    searchTerm,
    filteredPrefectures,
    handleSearchChange,
    handleDownloadCSV,
    handleFileChange,
    updatePrefectures,
    isLoading,
  } = usePrefectureList(prefectures, setPrefectures)

  if (isLoading) return <Loading />

  return (
    <div className="prefecture-wrapper">
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full mb-4 gap-4">
          <div className="flex gap-4">
            <FileInput onChange={handleFileChange} accept=".csv" />
            <Button variant="primary" onClick={updatePrefectures}>
              更新
            </Button>
          </div>
          <div className="flex gap-4">
            <TextField
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="都道府県を検索..."
            />
            <Button variant="secondary" onClick={handleDownloadCSV}>
              出力
            </Button>
          </div>
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
