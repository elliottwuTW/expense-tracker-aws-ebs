// format date in YYYY-MM-DD
const formatDate = (utcDate) => utcDate.toISOString().slice(0, 10)

module.exports = {
  equal: (a, b) => {
    if (typeof a !== 'undefined' && typeof b !== 'undefined') {
      return a.toString() === b.toString()
    }
  },
  abs: (value) => Math.abs(value),
  formatDate,
  formatDuration: (duration) => `${formatDate(duration.minDate)}` + ' ~ ' + `${formatDate(duration.maxDate)}`
}
