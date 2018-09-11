#!/usr/bin/env node

const program = require('commander')

let targetDate

program
  .version('1.0.0')
  .arguments('<date>')
  .option('-t, --token <token>', 'Token')
  .action(cmd => {
    targetDate = cmd

    if (!program.token && !process.env.DR_TOGGL_TOKEN) {
      console.error('--token option or DR_TOGGL_TOKEN env is required')
      console.log('')
      program.outputHelp()
      process.exit(1)
    } else if (!program.token && process.env.DR_TOGGL_TOKEN) {
      program.token = process.env.DR_TOGGL_TOKEN
    }
  })

program.parse(process.argv)

if (typeof targetDate === 'undefined') {
  const date = new Date()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const dateS = `${date.getDate()}`.padStart(2, '0')
  targetDate = `${date.getFullYear()}-${month}-${dateS}`
}

if (!targetDate.match(/[\d]{4}-[\d]{2}-[\d]{2}/)) {
  console.error(`${targetDate} is wrong date format (yyyy-mm-dd)`)
  console.log('')
  program.outputHelp()
  process.exit(1)
}

require('./daily-report')(targetDate, program.token).then(output => {
  console.log(output)
})
