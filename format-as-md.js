const secondsToTime = require('./seconds-to-time')

module.exports = data => {
  const projects = data.reduce((a, c) => {
    if (c.duration < 0) {
      return a
    }

    const splited = !c.description ? [''] : c.description.split('::', 2)
    const project = splited.length === 2 ? splited[0] : 'No Project'
    a[project] = a[project] || {}
    const desc = splited.length === 2 ? splited[1] : c.description || 'N/A'

    if (a[project][desc]) {
      a[project][desc] += c.duration
    } else {
      a[project][desc] = c.duration
    }
    return a
  }, {})

  let output = `\n\n`

  Object.keys(projects).forEach(project => {
    const entries = Object.keys(projects[project]).reduce((a, c) => {
      return `${a}${c.trim()} | ${secondsToTime(projects[project][c])}
`
    }, '')

    output += `## ${project}
task|schedule|spent|note
:---|---:|---:|:---
${entries}\n`
  })

  return output
}
