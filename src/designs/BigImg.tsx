import { ImgHTMLAttributes, useState } from 'react'

/** Wikimedia thumbnail URL at another standard width (960, 1280…). */
export const sized = (src: string, width: number) => src.replace(/\/\d+px-([^/]+)$/, `/${width}px-$1`)

// Large photos ask Wikimedia for a bigger thumbnail; if that size does not
// exist (small originals), fall back to the URL stored in the guide data.
export default function BigImg({ src, width = 960, onError, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { src: string; width?: number }) {
  const [fallback, setFallback] = useState(false)
  const url = fallback ? src : sized(src, width)
  return (
    <img
      {...rest}
      src={url}
      onError={(e) => {
        if (!fallback && url !== src) setFallback(true)
        else onError?.(e)
      }}
    />
  )
}
