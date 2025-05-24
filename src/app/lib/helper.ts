// ========================
// CSV ダウンロード関数
// ========================
const downloadCSV = <T>(
  data: T[],
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

/**
 * 各フィールドに対して適用されるパーサー関数のマッピング型
 * - 任意で指定でき、文字列を適切な型（数値・日付など）に変換できる
 */
export type ParserMap<T> = Partial<
  Record<keyof T, (value: string) => T[keyof T]>
>

const parseCSV = <T>(
  csvText: string,
  keys: (keyof T)[],
  parserMap: ParserMap<T> = {},
): T[] => {
  // 改行でCSVを行単位に分割し、空行を除去（前後の空白も除去）
  const lines = csvText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const result: T[] = []

  // 1行目はヘッダーとしてスキップ（i=1から開始）
  for (let i = 1; i < lines.length; i++) {
    // 行をカンマ区切りで分割（簡易実装、カンマ内クォート未対応）
    const values = lines[i].split(',').map((value) => value.trim())
    // 空のオブジェクトを初期化
    const item: T = {} as T

    // 各カラム（key）に対応する値を取り出し、必要に応じてパース
    keys.forEach((key, index) => {
      // クォートを除去し、前後の空白を削除
      const rawValue = values[index]?.replace(/"/g, '').trim()
      // 値が存在しない場合はスキップ
      if (rawValue === undefined) return

      // パーサー関数があれば適用、なければ文字列のまま格納
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
