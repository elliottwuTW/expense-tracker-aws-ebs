module.exports = (records) => {
  const totalAmount = records.reduce((acc, cur, index, arr) => {
    cur = arr[index].amount
    return acc + cur
  }, 0)
  return totalAmount
}
