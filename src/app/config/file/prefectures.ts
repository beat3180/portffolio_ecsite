import type { Prefecture } from '../../types/prefectures'

const PREFECTURE_CSV_HEADERS = [
  'ID',
  '都道府県名',
  '地域',
  '都道府県庁所在地',
  '面積',
  '人口',
  '画像',
]

const PREFECTURE_CSV_FILE_NAME = '都道府県一覧'

const PREFECTURE_KEY_NAME: (keyof Prefecture)[] = [
  'id',
  'name',
  'region',
  'capital',
  'area',
  'population',
  'image_url',
]

export { PREFECTURE_CSV_HEADERS, PREFECTURE_CSV_FILE_NAME, PREFECTURE_KEY_NAME }
