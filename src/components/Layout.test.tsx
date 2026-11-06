import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Layout from './Layout'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Layout>
        <div>Contenido</div>
      </Layout>
    </MemoryRouter>,
  )
}

describe('Layout', () => {
  it('renders the title matching the route', () => {
    renderAt('/lugares')
    expect(
      screen.getByRole('heading', { name: 'Lugares imprescindibles' }),
    ).toBeInTheDocument()
  })

  it('renders child content', () => {
    renderAt('/')
    expect(screen.getByText('Contenido')).toBeInTheDocument()
  })

  it('does not show the back button on home', () => {
    renderAt('/')
    expect(
      screen.queryByRole('button', { name: 'Volver al inicio' }),
    ).not.toBeInTheDocument()
  })

  it('shows the back button off home and navigates home', async () => {
    render(
      <MemoryRouter initialEntries={['/mapa']}>
        <Layout>
          <div>Contenido</div>
        </Layout>
      </MemoryRouter>,
    )
    const back = screen.getByRole('button', { name: 'Volver al inicio' })
    expect(back).toBeInTheDocument()
    await userEvent.click(back)
    expect(screen.getByRole('heading', { name: /Viajes J\.R\. Collini/i })).toBeInTheDocument()
  })

  it('renders the bottom navigation links', () => {
    renderAt('/')
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Inicio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mapa/i })).toBeInTheDocument()
  })

  it('uses the default title on unknown routes', () => {
    renderAt('/ruta-inexistente')
    expect(screen.getByRole('heading', { name: /Viajes J\.R\. Collini/i })).toBeInTheDocument()
  })
})
