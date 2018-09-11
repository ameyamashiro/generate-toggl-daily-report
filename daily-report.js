const axios = require('axios')
const formatAsMd = require('./format-as-md')

module.exports = async (reportDate, token) => {
  const startDate = encodeURIComponent(`${reportDate}T00:00:00+09:00`)
  const endDate = encodeURIComponent(`${reportDate}T23:59:59+09:00`)

  try {
    const { data } = await axios({
      url: `https://www.toggl.com/api/v8/time_entries?start_date=${startDate}&end_date=${endDate}`,
      method: 'get',
      headers: { 'content-type': 'application/json' },
      auth: {
        username: token,
        password: 'api_token'
      }
    })

    return formatAsMd(data)
  } catch (e) {
    console.error(e)
  }
}
