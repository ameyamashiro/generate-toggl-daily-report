module.exports = seconds => {
  const d = new Date(seconds * 1000)

  const hour = `${d.getUTCHours()}`
  const minutes = `${d.getUTCMinutes()}`.padStart(2, '0')

  return `${hour}:${minutes}`
}
