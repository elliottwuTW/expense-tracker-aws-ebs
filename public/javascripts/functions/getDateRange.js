// format date in YYYY-MM-DD
const getDateRange = (period) => {
  const minDate = new Date(period)
  const maxDate = new Date(period)
  maxDate.setMonth(maxDate.getMonth() + 1)
  maxDate.setDate(maxDate.getDate() - 1)

  return { minDate, maxDate }
}

export { getDateRange }
