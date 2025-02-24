'use client'

import {
  PrefecturesProvider,
  usePrefecturesContext,
} from './context/PrefecturesContext'
import PrefectureList from './components/PrefectureList'
import '../../styles/prefectures.css'
import Loading from '../../components/common/Loading'

export default function PrefecturesPage() {
  return (
    <PrefecturesProvider>
      <PrefectureListWrapper />
    </PrefecturesProvider>
  )
}

function PrefectureListWrapper() {
  const { prefectures, isLoading } = usePrefecturesContext()

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
