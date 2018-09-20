const axios = require('axios')

module.exports = async (pid, token) => {
  if (!pid) {
    return false
  }

  try {
    const { data } = await axios({
      url: `https://www.toggl.com/api/v8/projects/${pid}`,
      method: 'get',
      auth: {
        username: token,
        password: 'api_token'
      }
    })
    return data.data
  } catch (e) {
    throw e
  }
}
