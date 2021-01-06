/**
 * @param {*} period : month in format YYYY-MM
 * will return the minimum and maximum date in this period
 */
module.exports = (period) => {
  const minDate = new Date(period)
  const maxDate = new Date(period)
  maxDate.setMonth(maxDate.getMonth() + 1)
  maxDate.setDate(maxDate.getDate() - 1)

  return { minDate, maxDate }
}
