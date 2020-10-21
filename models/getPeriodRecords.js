/**
 * return the filtered records in a certain period
 */
function getPeriodRecords(records, period) {
  const todayDate = new Date()
  const OFFSET_HOURS = 8
  todayDate.setHours(OFFSET_HOURS, 0, 0, 0)

  const minDate = todayDate
  let monthNum = Number(todayDate.toISOString().slice(5, 7)) - 1

  // set minimum month corresponding to the given period
  switch (period) {
    case 'today':
      break

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
  // filter the matched records
  minDate.setMonth(monthNum)
  records = records.filter(record => record.date >= minDate)

  // date transformation
  records.forEach(record => {
    record.date = record.date.toISOString().slice(0, 10)
  })

  return records
}

module.exports = getPeriodRecords
