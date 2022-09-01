import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { recommendation, storeId } = req.body

  try {
    const response = await axios.post(
      `${process.env.PUBLIC_URL}/api/web/recommendations`,
      {
        recommendation,
        storeId
      },
      { withCredentials: true }
    )
    console.log(response)
    return res.status(200).json({ data: response.data })
  } catch (err) {
    return res.status(500).json({ err, message: '뭔가 문제가 있음' })
  }
}

export default handler
