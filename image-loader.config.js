// image-loader.config.js
import { imageLoader } from 'next-image-loader/build/image-loader'
import { uploadcareLoader } from '@uploadcare/nextjs-loader'

imageLoader.loader = uploadcareLoader
