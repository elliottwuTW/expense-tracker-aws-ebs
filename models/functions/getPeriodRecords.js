/**
 * return the filtered records in a certain period
 */
function getPeriodRecords(records, period) {
  const minDate = new Date(period)

  const maxDate = new Date(period)
  maxDate.setMonth(maxDate.getMonth() + 1)
  maxDate.setDate(maxDate.getDate() - 1)

  // filter the records between minDate and maxDate
  records = records.filter(
    (record) => record.date >= minDate && record.date <= maxDate
  )

  // date transformation
  records.forEach((record) => {
    record.date = record.date.toISOString().slice(0, 10)
  })

  return records
}

module.exports = getPeriodRecords
