import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PlaceImage from './PlaceImage'
import type { Place } from '../types'

const place: Place = {
  id: 'test',
  name: 'Sitio de prueba',
  category: 'Museo',
  description: 'desc',
  address: 'dir',
  lat: 1,
  lng: 2,
  image: 'https://example.com/foto.jpg',
}

describe('PlaceImage', () => {
  it('renders the image with the place name as alt', () => {
    render(<PlaceImage place={place} />)
    const img = screen.getByRole('img', { name: 'Sitio de prueba' })
    expect(img).toHaveAttribute('src', 'https://example.com/foto.jpg')
  })

  it('shows the fallback with the name when the image fails', () => {
    render(<PlaceImage place={place} />)
    fireEvent.error(screen.getByRole('img', { name: 'Sitio de prueba' }))
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Sitio de prueba')).toBeInTheDocument()
  })
})
