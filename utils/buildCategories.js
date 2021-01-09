/**
 * @param {*} categories : categories array
 * to remove 'all' option and move 'else' option to the bottom
 */
module.exports = (categories) => {
  // remove 'all' option
  categories.shift()
  // move 'else' to the bottom
  const elseIndex = categories.findIndex(category => category.value === 'else')
  const elseEl = categories.splice(elseIndex, 1)
  categories.push(elseEl[0])

  return true
}