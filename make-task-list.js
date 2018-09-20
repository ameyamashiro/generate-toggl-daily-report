const secondsToTime = require('./seconds-to-time')

module.exports = taskList => {
  return Object.keys(taskList).reduce((a, c) => {
    const s = c.trim().split('|')
    a.push([s[0], s[1], secondsToTime(taskList[c])])
    return a
  }, [])
}
