'use client'

import PrefectureList from './components/PrefectureList'
import '../../styles/prefectures.css'
import Loading from '../../components/common/Loading'
import { usePrefecture } from './hooks/usePrefecture'

export default function PrefecturesPage() {
  const { prefectures, isLoading } = usePrefecture()

  if (isLoading) return <Loading />

  return (
    <div>
      <h1 className="prefectures-title">都道府県一覧</h1>
      {prefectures.length > 0 ? (
        <PrefectureList prefectures={prefectures} />
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  )
}
