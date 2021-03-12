module.exports = (object) => {
  console.log('object: ', object)
  // Array
  if (Array.isArray(object) || typeof object === 'string' || object instanceof String) return object.length === 0
  // Object
  if (object.toString() === '[object Object]') return Object.keys(object).length === 0
  // Map or Set
  if (object instanceof Map || object instanceof Set) return object.size === 0

  return false
}
