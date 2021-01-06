/**
 * Get this month in format YYYY-MM
 */
module.exports = () => {
  const thisMonth = new Date()
  return thisMonth.toISOString().slice(0, 7)
}
