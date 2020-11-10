module.exports = () => {
  const today = new Date()
  return today.toISOString().slice(0, 7)
}
