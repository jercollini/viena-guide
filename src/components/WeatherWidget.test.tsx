import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import WeatherWidget from './WeatherWidget'

describe('WeatherWidget', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows temperature and description when data loads', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({
          current: { temperature_2m: 21.6, weather_code: 0 },
        }),
      }),
    )
    render(<WeatherWidget />)
    await waitFor(() => expect(screen.getByText('22°C')).toBeInTheDocument())
    expect(screen.getByText(/Despejado/)).toBeInTheDocument()
  })

  it('shows the loading state initially', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<WeatherWidget />)
    expect(screen.getByText(/Cargando el tiempo/)).toBeInTheDocument()
  })

  it('shows a message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(<WeatherWidget />)
    await waitFor(() =>
      expect(screen.getByText(/No disponible ahora mismo/)).toBeInTheDocument(),
    )
  })

  it('maps different weather codes', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({
          current: { temperature_2m: 5, weather_code: 63 },
        }),
      }),
    )
    render(<WeatherWidget />)
    await waitFor(() => expect(screen.getByText(/Lluvia/)).toBeInTheDocument())
  })
})
