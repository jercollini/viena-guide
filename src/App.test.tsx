import { guide } from './guide/config'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TileLayer: () => null,
  Marker: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))
vi.mock('leaflet', () => ({ default: { divIcon: () => ({}), latLngBounds: () => ({}) } }))

import App from './App'

describe('App (routing)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
  })

  it('renders the home page on the root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(guide.city)).toBeInTheDocument()
  })

  it('renders the phrases page on its route', () => {
    render(
      <MemoryRouter initialEntries={['/frases']}>
        <App />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: 'Frases útiles' }),
    ).toBeInTheDocument()
  })

  it('redirects unknown routes to home', () => {
    render(
      <MemoryRouter initialEntries={['/no-existe']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(guide.city)).toBeInTheDocument()
  })
})
