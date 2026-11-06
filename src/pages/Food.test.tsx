import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Food from './Food'
import { dishes } from '../guide/food'

describe('Food', () => {
  it('renders every dish', () => {
    render(<Food />)
    for (const d of dishes) {
      expect(screen.getByRole('heading', { name: d.name })).toBeInTheDocument()
    }
  })

  it('links only the dishes that have a spot', () => {
    render(<Food />)
    expect(screen.getAllByRole('link', { name: /Cómo llegar/ })).toHaveLength(
      dishes.filter((d) => d.spot).length,
    )
  })
})
