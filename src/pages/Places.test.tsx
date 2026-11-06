import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Places from './Places'
import { places } from '../guide/places'

describe('Places', () => {
  it('renders every place with name and map link', () => {
    render(<Places />)
    for (const place of places) {
      expect(
        screen.getByRole('heading', { name: place.name }),
      ).toBeInTheDocument()
    }
    const links = screen.getAllByRole('link', { name: /Cómo llegar/ })
    expect(links).toHaveLength(places.length)
    expect(links[0]).toHaveAttribute(
      'href',
      expect.stringContaining('google.com/maps'),
    )
  })

  it('shows a tip when the place has one', () => {
    render(<Places />)
    const withTip = places.find((p) => p.tip)!
    expect(screen.getByText(new RegExp(withTip.tip!.slice(0, 15)))).toBeInTheDocument()
  })
})
