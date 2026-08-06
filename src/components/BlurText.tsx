import { useEffect, useState } from 'react'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// ReactBits-style: las palabras aparecen una a una con un desenfoque suave.
export default function BlurText({ text }: { text: string }) {
  const words = text.split(' ')
  const [shown, setShown] = useState(reduced ? words.length : 0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= words.length) {
          clearInterval(id)
          return n
        }
        return n + 1
      })
    }, 180)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <span className="blur-text">
      {words.map((w, i) => (
        <span
          key={i}
          className={'blur-text__word' + (i < shown ? ' is-in' : '')}
        >
          {w}
        </span>
      ))}
    </span>
  )
}
