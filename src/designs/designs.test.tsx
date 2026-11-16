import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { guide } from '../guide/config'
import { itinerary } from '../guide/itinerary'
import { places } from '../guide/places'

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TileLayer: () => null,
  Marker: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))
vi.mock('leaflet', () => ({ default: { divIcon: () => ({}), latLngBounds: () => ({}) } }))

import App from '../App'
import { resolveDesign } from './shared'
import { sized } from './BigImg'
import type { Design } from '../types'

const renderAt = (design: Design, path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App design={design} />
    </MemoryRouter>,
  )

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
  window.scrollTo = vi.fn()
})

describe('design selection', () => {
  it('uses ?design= when it names a known design', () => {
    expect(resolveDesign('?design=ruta')).toBe('ruta')
    expect(resolveDesign('?design=revista')).toBe('revista')
  })
  it('falls back to the guide design, or "app"', () => {
    expect(resolveDesign('?design=nope')).toBe(guide.design ?? 'app')
    expect(resolveDesign('')).toBe(guide.design ?? 'app')
  })
  it('asks Wikimedia for a larger thumbnail', () => {
    expect(sized('https://x/thumb/a/ab/F.jpg/500px-F.jpg', 1280)).toBe('https://x/thumb/a/ab/F.jpg/1280px-F.jpg')
    expect(sized('https://x/F.jpg', 1280)).toBe('https://x/F.jpg')
  })
})

describe.each(['revista', 'ruta'] as const)('design %s', (design) => {
  it('shows the city on the home page with every day and place', () => {
    renderAt(design)
    expect(screen.getByRole('heading', { level: 1, name: guide.city })).toBeInTheDocument()
    expect(screen.getAllByText(places[0].name).length).toBeGreaterThan(0)
    expect(screen.getAllByText(new RegExp(itinerary[0].title)).length).toBeGreaterThan(0)
  })

  it.each([
    ['/plan', itinerary[itinerary.length - 1].title],
    ['/lugares', places[places.length - 1].name],
    ['/frases', null],
    ['/emergencias', null],
    ['/transporte', null],
    ['/comida', null],
    ['/mapa', null],
  ])('renders %s', (path, text) => {
    renderAt(design, path)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 }).length).toBe(1)
    if (text) expect(screen.getAllByText(text).length).toBeGreaterThan(0)
  })

  it('always offers a way to the emergency page', () => {
    renderAt(design)
    expect(screen.getAllByRole('link', { name: /emergencias/i }).length).toBeGreaterThan(0)
  })
})

describe('revista', () => {
  it('opens the index and closes it with Escape', async () => {
    const user = userEvent.setup()
    renderAt('revista')
    await user.click(screen.getByRole('button', { name: /índice/i }))
    const dialog = screen.getByRole('dialog', { name: 'Índice' })
    expect(within(dialog).getByRole('link', { name: /Frases útiles/ })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('ruta', () => {
  it('switches the day shown on the home page', async () => {
    const user = userEvent.setup()
    renderAt('ruta')
    const last = itinerary[itinerary.length - 1]
    await user.click(screen.getByRole('tab', { name: new RegExp(`Día\\s*${last.day}`) }))
    expect(screen.getByRole('tabpanel')).toHaveTextContent(last.title)
  })
})
