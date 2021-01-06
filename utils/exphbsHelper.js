module.exports = {
  ifEquals: function (targetItem, iteratedItem, options) {
    return targetItem === iteratedItem
      ? options.fn(this)
      : options.inverse(this)
  },
  formatDate: (utcDate) => utcDate.toISOString().slice(0, 10),
  formatDuration: (duration) => `${duration.minDate.toISOString().slice(0, 10)}` +
      ' ~ ' + `${duration.maxDate.toISOString().slice(0, 10)}`
}
