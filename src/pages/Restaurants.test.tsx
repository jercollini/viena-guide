import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Restaurants from './Restaurants'
import { restaurants } from '../guide/restaurants'

describe('Restaurants', () => {
  it('renders every restaurant', () => {
    render(<Restaurants />)
    for (const r of restaurants) {
      expect(screen.getByRole('heading', { name: r.name })).toBeInTheDocument()
    }
  })

  it('renders a map link for each restaurant', () => {
    render(<Restaurants />)
    expect(screen.getAllByRole('link', { name: /Cómo llegar/ })).toHaveLength(
      restaurants.length,
    )
  })
})
