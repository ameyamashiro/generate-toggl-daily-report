const readline = require('readline')
const makeTaskTextLine = require('./make-task-text-line')

module.exports = projects =>
  new Promise(async (resolve, reject) => {
    const continued = {}
    const completed = {}

    // interactive selection for continued or completed
    await Object.keys(projects)
      .map(project => async () => {
        await Object.keys(projects[project])
          .map(taskName => () =>
            new Promise(resolve => {
              process.stdout.write(
                `Is "${project} : ${taskName}" done? [y|n]: `
              )

              const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
              })

              rl.on('line', line => {
                if (line === 'n') {
                  continued[project] = continued[project] || {}
                  continued[project][taskName] =
                    continued[project][taskName] || {}
                  continued[project][taskName] = projects[project][taskName]
                } else {
                  completed[project] = completed[project] || {}
                  completed[project][taskName] =
                    completed[project][taskName] || {}
                  completed[project][taskName] = projects[project][taskName]
                }

                rl.close()
              })

              rl.on('close', () => {
                resolve()
              })
            })
          )
          .reduce((a, c) => a.then(() => c()), Promise.resolve())
      })
      .reduce((a, c) => a.then(() => c()), Promise.resolve())

    let output = `\n\n`
    const allKeys = [...Object.keys(continued), ...Object.keys(completed)]

    allKeys
      .filter((item, pos) => allKeys.indexOf(item) === pos)
      .forEach(project => {
        output += `## ${project}\n`

        // continued
        if (continued[project]) {
          output += '[継続]\n\n'
          output += `task|schedule|spent|note\n`
          output += `:---|---:|---:|:---\n`
          output += makeTaskTextLine(continued[project])
          output += `\n`
        }

        // completed
        if (completed[project]) {
          output += '[完了]\n\n'
          output += `task|schedule|spent|note\n`
          output += `:---|---:|---:|:---\n`
          output += makeTaskTextLine(completed[project])
          output += `\n`
        }
      })

    return resolve(output)
  })
