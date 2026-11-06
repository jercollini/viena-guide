import { useEffect, useRef, useState } from 'react'

export const THEMES = [
  { id: 'pop', label: 'Pop', hint: 'Divertido', color: '#ffe14d', dot: '#ff3d81', meta: '#ffe14d' },
  { id: 'aurora', label: 'Claro', hint: 'Aurora', color: '#eef0ff', dot: '#6c4dff', meta: '#eef0ff' },
  { id: 'neon', label: 'Oscuro', hint: 'Neón', color: '#0b0b12', dot: '#c6ff3d', meta: '#0b0b12' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

function readTheme(): ThemeId {
  const current = document.documentElement.getAttribute('data-theme')
  return THEMES.some((t) => t.id === current) ? (current as ThemeId) : 'pop'
}

export function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute('data-theme', id)
  try {
    localStorage.setItem('theme', id)
  } catch {
    /* sin almacenamiento: el tema solo dura esta sesión */
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', THEMES.find((t) => t.id === id)!.meta)
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeId>(readTheme)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (id: ThemeId) => {
    applyTheme(id)
    setTheme(id)
    setOpen(false)
  }

  return (
    <div className="theme-switcher" ref={ref}>
      <button
        className="theme-switcher__btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambiar aspecto"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.5-1.9-.3-1 .4-2.1 1.5-2.1H17a4 4 0 0 0 4-4c0-5-4-10-9-10zM7.5 11h.01M10 7.5h.01M14.5 7.5h.01" />
        </svg>
      </button>
      {open && (
        <div className="theme-switcher__menu" role="menu">
          {THEMES.map((t) => (
            <button
              key={t.id}
              role="menuitemradio"
              aria-checked={theme === t.id}
              className={'theme-option' + (theme === t.id ? ' is-active' : '')}
              onClick={() => choose(t.id)}
            >
              <span className="theme-option__swatch" style={{ background: t.color }}>
                <i style={{ background: t.dot }} />
              </span>
              <span className="theme-option__text">
                <strong>{t.label}</strong>
                <small>{t.hint}</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
