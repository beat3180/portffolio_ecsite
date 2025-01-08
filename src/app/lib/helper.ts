

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


export { downloadCSV, formatDate }
