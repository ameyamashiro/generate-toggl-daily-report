const axios = require('axios')

module.exports = async (cid, token) => {
  if (!cid) {
    return false
  }

  console.log(cid)

  console.log(`https://www.toggl.com/api/v8/clients/${cid}`)

  try {
    const { data } = await axios({
      url: `https://www.toggl.com/api/v8/clients/${cid}`,
      method: 'get',
      auth: {
        username: token,
        password: 'api_token'
      }
    })
    console.log(data)
    return data.data
  } catch (e) {
    throw e
  }
}
