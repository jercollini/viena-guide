import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Itinerary from './Itinerary'
import { itinerary } from '../guide/itinerary'

describe('Itinerary', () => {
  it('renders one section per day with its title', () => {
    render(<Itinerary />)
    for (const day of itinerary) {
      expect(screen.getByRole('heading', { name: day.title })).toBeInTheDocument()
      expect(screen.getByText(`Día ${day.day}`)).toBeInTheDocument()
    }
  })
})
