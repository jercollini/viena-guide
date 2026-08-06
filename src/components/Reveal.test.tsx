import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Reveal from './Reveal'

describe('Reveal', () => {
  it('renders child content', () => {
    render(
      <Reveal>
        <p>Contenido revelado</p>
      </Reveal>,
    )
    expect(screen.getByText('Contenido revelado')).toBeInTheDocument()
  })

  it('applies the visible class when it enters the viewport', () => {
    let trigger: ((entries: { isIntersecting: boolean }[]) => void) | null = null
    class IO {
      constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
        trigger = cb
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal('IntersectionObserver', IO)

    const { container } = render(
      <Reveal delay={100}>
        <p>Aparezco</p>
      </Reveal>,
    )
    act(() => {
      trigger?.([{ isIntersecting: true }])
    })
    expect(container.querySelector('.reveal--in')).not.toBeNull()
  })
})
