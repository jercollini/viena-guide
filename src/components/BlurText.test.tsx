import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlurText from './BlurText'

describe('BlurText', () => {
  it('renders all words in the text', () => {
    render(<BlurText text="Hola Viena bonita" />)
    expect(screen.getByText('Hola')).toBeInTheDocument()
    expect(screen.getByText('Viena')).toBeInTheDocument()
    expect(screen.getByText('bonita')).toBeInTheDocument()
  })

  it('renders a single word', () => {
    render(<BlurText text="Viena" />)
    expect(screen.getByText('Viena')).toBeInTheDocument()
  })
})
