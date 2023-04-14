export const debounce = (func, wait = 300) => {
  let debounceTimer
  return function () {
    // eslint-disable-next-line consistent-this
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), wait)
  }
}
