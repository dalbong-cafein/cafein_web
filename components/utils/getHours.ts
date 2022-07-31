const getHours = (hour24: string) => {
  const s_time = hour24.split(':')
  let hour: string | number = Number(s_time[0])
  if (hour >= 12) {
    if (hour > 12) {
      hour -= 12
      if (hour < 10) {
        hour = '0' + String(hour)
      }
    } else {
      hour = String(hour)
    }
    return '오후 ' + hour + ':' + s_time[1]
  } else return '오전 ' + hour24
}

export default getHours
