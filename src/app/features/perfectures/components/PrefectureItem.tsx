import type { PrefectureItemProps } from '../types'


const PrefectureItem = ({
  prefecture,
}: PrefectureItemProps) => {
  const imageUrl = prefecture.image_url
  console.log(imageUrl)


  return (
    <div className="prefecture-item">
      {imageUrl && (
        <img src={imageUrl} alt={prefecture.name} width="100" height="100" />
      )}
      <h3>{prefecture.name}</h3>
      <p>地域: {prefecture.region}</p>
      <p>都道府県庁所在地: {prefecture.capital}</p>
      <p>面積: {prefecture.area} km²</p>
      <p>人口: {prefecture.population} 人</p>
    </div>
  )
}

export default PrefectureItem
