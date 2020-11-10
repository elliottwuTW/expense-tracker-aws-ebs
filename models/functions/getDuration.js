/**
 * return the time duration
 */
function getDuration(period) {
  const minDate = new Date(period)

  const maxDate = new Date(period)
  maxDate.setMonth(maxDate.getMonth() + 1)
  maxDate.setDate(maxDate.getDate() - 1)

  // date transformation
  return (
    `${minDate.toISOString().slice(0, 10)}` +
    ' ~ ' +
    `${maxDate.toISOString().slice(0, 10)}`
  )
}

module.exports = getDuration
