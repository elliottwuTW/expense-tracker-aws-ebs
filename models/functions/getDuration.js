/**
 * return the time duration
 */
function getDuration(period) {
  const todayDate = new Date()
  const fromDate = new Date()

  // set the start month
  if (period !== 'today') {
    let monthNum = Number(todayDate.toISOString().slice(5, 7)) - 1
    switch (period) {
      case 'recentMonth':
        monthNum -= 1
        break

      case 'recentHalfYear':
        monthNum -= 6
        break

      case 'recentYear':
        monthNum -= 12
        break

      default:
        break
    }
    fromDate.setMonth(monthNum)
  }

  // date transformation
  let duration = todayDate.toISOString().slice(0, 10)
  if (period !== 'today') {
    duration = `${fromDate.toISOString().slice(0, 10)}` + ' ~ ' + todayDate.toISOString().slice(0, 10)
  }

  return duration
}

module.exports = getDuration
