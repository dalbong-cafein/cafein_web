import { useRouter } from 'next/router'

const DetailStorePage = () => {
  const router = useRouter()
  console.log(router.query)

  return <h1>Hello Query</h1>
}

export default DetailStorePage
