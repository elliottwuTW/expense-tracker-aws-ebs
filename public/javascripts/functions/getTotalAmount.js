// get total amount of all records
const getTotalAmount = (records) => {
  records.reduce((acc, cur, index, arr) => {
    cur = arr[index].amount
    return acc + cur
  }, 0)
}

export { getTotalAmount }
