module.exports = entries => {
  return entries.reduce((a, c) => {
    if (c.duration < 0) {
      return a
    }

    const project = c.pid || ''
    const desc = c.description || 'No Description'

    a[project] = a[project] || {}

    if (a[project][desc]) {
      a[project][desc] += c.duration
    } else {
      a[project][desc] = c.duration
    }
    return a
  }, {})
}
