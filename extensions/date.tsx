export {}

declare global {
  interface Date {
    formattedDateTime(): string
    dateTimeBefore(): string
  }
}

Date.prototype.formattedDateTime = function () {
  const date = this as unknown as Date
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}/${String(date.getDate()).padStart(2, '0')} ${String(
    date.getHours(),
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

Date.prototype.dateTimeBefore = function () {
  const targetDate = this.getTime()
  const now = Date.now()
  const diff = now - targetDate
  const day = Math.floor(diff / (24 * 60 * 60 * 1000))
  const hour = Math.floor(diff / (60 * 60 * 1000))
  const minute = Math.floor(diff / (60 * 1000))
  const second = Math.floor(diff)

  if (second <= 60) {
    return `${second}秒前`
  } else if (minute <= 60) {
    return `${minute}分前`
  } else if (hour <= 24) {
    return `${hour}時間前`
  } else {
    return `${day}日前`
  }
}
