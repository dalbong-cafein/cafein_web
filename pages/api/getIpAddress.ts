import { NextApiHandler, NextApiResponse } from 'next'

const handler = (req: NextApiHandler, res: NextApiResponse) => {
  fetch('https://jsonip.com')
    .then((resp) => resp.json())
    .then(({ ip }) => {
      return res.status(200).json({ ip })
    })
    .catch((err) => {
      return res.status(500).json({ err, message: 'ip주소 얻기 실패' })
    })
}

export default handler
