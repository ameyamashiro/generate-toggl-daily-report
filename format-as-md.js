const secondsToTime = require('./seconds-to-time')

module.exports = projects => {
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
