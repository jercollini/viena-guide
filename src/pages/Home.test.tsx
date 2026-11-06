import { guide } from '../guide/config'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
  })

  it('renders the hero title and subtitle', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByText(guide.city)).toBeInTheDocument()
    expect(screen.getByText(guide.tagline)).toBeInTheDocument()
  })

  it('renders the menu cards with their links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('link', { name: /Lugares imprescindibles/ }),
    ).toHaveAttribute('href', '/lugares')
    expect(screen.getByRole('link', { name: /Comida típica/ })).toHaveAttribute(
      'href',
      '/comida',
    )
    expect(screen.getByRole('link', { name: /Emergencias/ })).toHaveAttribute(
      'href',
      '/emergencias',
    )
  })
})
