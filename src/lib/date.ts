const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
}

export const formatDate = (date: Date) =>
    date.toLocaleDateString("ja-JP", options)
