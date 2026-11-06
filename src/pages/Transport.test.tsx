import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Transport from './Transport'
import { transport } from '../guide/transport'

describe('Transport', () => {
  it('renders every transport section', () => {
    render(<Transport />)
    for (const item of transport) {
      expect(
        screen.getByRole('heading', { name: item.title }),
      ).toBeInTheDocument()
    }
  })
})
