const formatAsMd = require('./format-as-md')
const fetchEntries = require('./fetch-entries')
const fetchProject = require('./fetch-project')
const fetchClient = require('./fetch-client')
const toTaskList = require('./to-task-list')

module.exports = async (reportDate, token) => {
  try {
    const entries = await fetchEntries(reportDate, token)

    const taskList = toTaskList(entries)
    const outputObj = {}

    // convert pid to project name
    await Promise.all(
      Object.keys(taskList).map(async pid => {
        const project = await fetchProject(pid, token)
        const client = await fetchClient(project.cid, token)

        let keyName = ''
        if (!project) {
          keyName = 'No Project'
        } else if (!client) {
          keyName = project.name
        } else {
          keyName = `${project.name} (${client.name})`
        }

        outputObj[keyName] = outputObj[keyName] || {}
        outputObj[keyName] = {
          ...outputObj[keyName],
          ...taskList[pid]
        }
      })
    )

    const output = await formatAsMd(outputObj)

    console.log(output)
  } catch (e) {
    throw e
  }
}
