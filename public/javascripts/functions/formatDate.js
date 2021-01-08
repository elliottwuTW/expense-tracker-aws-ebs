// format date string to YYYY-MM-DD
// "2021-01-01T00:00:00.000Z" -> "2021-01-01"
const formatDate = (utcString) => utcString.slice(0, 10)

export { formatDate }
