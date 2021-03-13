/**
 * @param {*} categories : categories array
 * sort the categories array and remove 'all' option if needed
 */
module.exports = (categories, keepAll) => {
  // sort ascending by createdAt
  categories.sort((a, b) => (new Date(a.createdAt)) - (new Date(b.createdAt)))
  if (!keepAll) {
    // remove 'all' option
    categories.shift()
  }

  return true
}
