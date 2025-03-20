// データをCSVとしてダウンロード
const downloadCSV = (
  data: unknown[],
  headers: string[],
  fileName: string,
  dateFormat = 'yyyyMMddHHmmss',
): void => {
  if (data.length === 0) {
    return
  }

  const timestamp = formatDate(new Date(), dateFormat)

  const headerRow = `${headers.map((header) => `"${header}"`).join(',')}\n`

  const body = data
    .map((item) => {
      return Object.entries(item as Record<string, unknown>)
        .map(([key, value]) => {
          if (key === 'image_url' && typeof value === 'string') {
            value = value
              .substring(value.lastIndexOf('/') + 1)
              .replace(/\.[^/.]+$/, '')
          }
          // nullとundefinedを空文字列に変換
          const stringValue =
            value === null || value === undefined ? '' : String(value)
          return `"${stringValue.replace(/"/g, '""')}"`
        })
        .join(',')
    })
    .join('\n')

  const csvData = headerRow + body

  const blob = new Blob([csvData], { type: 'text/csv' })

  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = `${fileName}_${timestamp}.csv`
  link.click()
}

// 日付をフォーマット
const formatDate = (
  date: Date = new Date(),
  formatString = 'yyyyMMddHHmmss',
): string => {
  const formatters: { [key: string]: (date: Date) => string } = {
    yyyy: (date) => date.getFullYear().toString().padStart(4, '0'),
    MM: (date) => (date.getMonth() + 1).toString().padStart(2, '0'),
    dd: (date) => date.getDate().toString().padStart(2, '0'),
    HH: (date) => date.getHours().toString().padStart(2, '0'),
    mm: (date) => date.getMinutes().toString().padStart(2, '0'),
    ss: (date) => date.getSeconds().toString().padStart(2, '0'),
  }

  let formattedDate = formatString
  for (const key in formatters) {
    formattedDate = formattedDate.replace(key, formatters[key](date))
  }

  return formattedDate
}
// CSVパース関数
const parseCSV = <T>(csvText: string, keys: (keyof T)[]): T[] => {
  const lines = csvText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  const result: T[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((value) => value.trim())
    const item: T = {} as T // T型のオブジェクトを初期化

    keys.forEach((key, index) => {
      const value = values[index]
        ? values[index].replace(/"/g, '').trim()
        : undefined

      // 型がnumberのものはNumber型にキャスト
      if (key === 'id' || key === 'area' || key === 'population') {
        item[key] = (
          value !== undefined ? Number(value) : undefined
        ) as T[keyof T] // 型アサーションを追加
      } else {
        item[key] = value as T[keyof T] // 型アサーションを追加
      }
    })

    result.push(item)
  }

  return result
}

export { downloadCSV, formatDate, parseCSV }
