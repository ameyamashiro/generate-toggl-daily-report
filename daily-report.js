const formatAsMd = require('./format-as-md')
const fetchEntries = require('./fetch-entries')
const fetchProjectName = require('./fetch-project-name')
const toTaskList = require('./to-task-list')

module.exports = async (reportDate, token) => {
  const entries = await fetchEntries(reportDate, token)

  const taskList = toTaskList(entries)

  const outputObj = {}

  // convert pid to project name
  await Promise.all(
    Object.keys(taskList).map(async pid => {
      const projectName = await fetchProjectName(pid, token)
      outputObj[projectName] = taskList[pid]
    })
  )

  const output = await formatAsMd(outputObj)

  console.log(output)

  // return formatAsMd(data, token)
}
