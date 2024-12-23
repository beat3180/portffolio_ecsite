'use client'

import { useFetchPrefecture } from '../hooks/useFetchPrefecture'
import Loading from '../../../components/common/Loading'
import '../styles/prefectureDetail.css'


export default function PrefecturePage({ params }: { params: { id: string } }) {
  const { prefecture, isLoading } = useFetchPrefecture(Number(params.id))

  if (isLoading) {
    return <Loading />
  }

  if (!prefecture) {
    return <div>都道府県データの取得に失敗しました。</div>
  }

  return (
    <div className="prefecture-detail-container">
      <img
        src={prefecture.image_url}
        alt={prefecture.name}
        width="200"
        height="200"
        loading="lazy"
        className="prefecture-detail-image"
      />
      <h1>{prefecture.name}</h1>
      <p>地域: {prefecture.region}</p>
      <p>都道府県庁所在地: {prefecture.capital}</p>
      <p>面積: {prefecture.area} km²</p>
      <p>人口: {prefecture.population} 人</p>
    </div>
  )
}
