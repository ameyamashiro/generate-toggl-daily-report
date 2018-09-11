const secondsToTime = require('./seconds-to-time')

module.exports = taskList => {
  return Object.keys(taskList).reduce((a, c) => {
    if (c.trim().split('|').length > 1) {
      return `${a}${c.trim()} | ${secondsToTime(taskList[c])}\n`
    } else {
      return `${a}${c.trim()} | | ${secondsToTime(taskList[c])}\n`
    }
  }, '')
}
