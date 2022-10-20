import { IcustomLoader } from 'utils'

const customLoader = ({ src, width, quality = 75 }: IcustomLoader) => {
  return `https://www.cafeinofficial.com/${src}?w=${width}&q=${quality}`
}

export default customLoader
