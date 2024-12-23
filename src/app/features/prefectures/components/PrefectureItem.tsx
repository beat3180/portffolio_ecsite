import type { PrefectureItemProps } from '../types'
import Link from 'next/link'

const PrefectureItem = ({ prefecture }: PrefectureItemProps) => {
  return (
    <Link
      href={`/features/prefectures/${prefecture.id}`}
      className="prefecture-item"
    >
      <img
        src={prefecture.image_url}
        alt={prefecture.name}
        width="100"
        height="100"
        loading="lazy"
      />
      <h3>{prefecture.name}</h3>
    </Link>
  )
};


export default PrefectureItem
