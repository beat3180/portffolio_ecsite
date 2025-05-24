// ========================
// CSV ダウンロード関数
// ========================
const downloadCSV = (
  data: unknown[],
  headers: string[],
  fileName: string,
  dateFormat = 'yyyyMMddHHmmss',
): void => {
  // データが空なら何もしない
  if (data.length === 0) {
    return
  }

  // 現在時刻を指定形式でフォーマット（例：20240523143000）
  const timestamp = formatDate(new Date(), dateFormat)

  // ヘッダー行をCSV形式で構築
  const headerRow = `${headers.map((header) => `"${header}"`).join(',')}\n`

  // 各行データをCSVに変換
  const body = data
    .map((item) => {
      return Object.entries(item as Record<string, unknown>)
        .map(([_, value]) => {
          let stringValue =
            value === null || value === undefined ? '' : String(value)

          // Supabase StorageのURLパターンの場合、ファイル名部分のみ抽出（拡張子除去）
          if (stringValue.includes('.supabase.co/storage/')) {
            try {
              const url = new URL(stringValue)
              const filename = url.pathname.split('/').pop() || ''
              stringValue = filename.replace(/\.[^/.]+$/, '') // 拡張子を除去
            } catch {
              // URLパース失敗時はそのまま使う
            }
          }
          // ダブルクォート内にエスケープ（CSV仕様）
          return `"${stringValue.replace(/"/g, '""')}"`
        })
        .join(',')
    })
    .join('\n')

  const csvData = headerRow + body

  // Blobを生成し、リンクを生成してダウンロードを実行
  const blob = new Blob([csvData], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = `${fileName}_${timestamp}.csv`
  link.click()
}

// ========================
// 日付フォーマット関数
// ========================
const formatDate = (
  date: Date = new Date(),
  formatString = 'yyyyMMddHHmmss',
): string => {
  // フォーマット指定子に対応する関数
  const formatters: { [key: string]: (date: Date) => string } = {
    yyyy: (date) => date.getFullYear().toString().padStart(4, '0'),
    MM: (date) => (date.getMonth() + 1).toString().padStart(2, '0'),
    dd: (date) => date.getDate().toString().padStart(2, '0'),
    HH: (date) => date.getHours().toString().padStart(2, '0'),
    mm: (date) => date.getMinutes().toString().padStart(2, '0'),
    ss: (date) => date.getSeconds().toString().padStart(2, '0'),
  }

  // formatString を逐次置換して最終的な日時文字列に
  let formattedDate = formatString
  for (const key in formatters) {
    formattedDate = formattedDate.replace(key, formatters[key](date))
  }

  return formattedDate
}

// ========================
// CSV文字列 → オブジェクト配列へ変換
// ========================
export type ParserMap<T> = Partial<
  Record<keyof T, (value: string) => T[keyof T]>
>

const parseCSV = <T>(
  csvText: string,
  keys: (keyof T)[],
  parserMap: ParserMap<T> = {},
): T[] => {
  const lines = csvText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const result: T[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((value) => value.trim())
    const item: T = {} as T

    keys.forEach((key, index) => {
      const rawValue = values[index]?.replace(/"/g, '').trim()
      if (rawValue === undefined) return

      const parser = parserMap[key]
      item[key] = parser ? parser(rawValue) : (rawValue as T[keyof T])
    })

    result.push(item)
  }

  return result
}

// ========================
// 外部エクスポート
// ========================
export { downloadCSV, formatDate, parseCSV }
