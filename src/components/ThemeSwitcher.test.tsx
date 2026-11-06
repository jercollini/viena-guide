import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ThemeSwitcher from './ThemeSwitcher'

describe('ThemeSwitcher', () => {
  it('cambia el tema y lo guarda', async () => {
    render(<ThemeSwitcher />)
    await userEvent.click(screen.getByRole('button', { name: /cambiar aspecto/i }))
    await userEvent.click(screen.getByRole('menuitemradio', { name: /oscuro/i }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('neon')
    expect(localStorage.getItem('theme')).toBe('neon')
    expect(screen.queryByRole('menu')).toBeNull()
  })
})
