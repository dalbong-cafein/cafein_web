const getIsToday = (idx: number) => {
  const today = new Date()
  const day = today.getDay()
  return (idx + 1) % 7 == day
}

export default getIsToday
