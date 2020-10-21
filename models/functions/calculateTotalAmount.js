function calculateTotalAmount(records) {
  let totoalAmount = 0
  records.forEach(record => {
    totoalAmount += record.amount
  })
  return totoalAmount
}

module.exports = calculateTotalAmount
