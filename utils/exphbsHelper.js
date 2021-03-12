// format date in YYYY-MM-DD
const formatDate = (dateISOString) => dateISOString.slice(0, 10)

module.exports = {
  equal: (a, b) => {
    if (typeof a !== 'undefined' && typeof b !== 'undefined') {
      return a.toString() === b.toString()
    }
  },
  abs: (value) => Math.abs(value),
  gteZero: (value) => Number(value) >= 0,
  formatDate,
  formatDuration: (duration) => `${formatDate(duration.minDate)}` + ' ~ ' + `${formatDate(duration.maxDate)}`
}
