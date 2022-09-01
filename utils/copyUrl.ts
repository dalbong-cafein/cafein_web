const copyUrl = (url: string) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('클립보드에 복사되었습니다.')
      })
      .catch((err) => {
        console.error(err)
        alert('복사를 다시 시도해주세요.')
      })
  } else if (!document.queryCommandIndeterm('copy')) {
    return alert('복사 기능이 지원되지 않는 브라우저 입니다.')
  }
}

export default copyUrl
