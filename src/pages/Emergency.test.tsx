import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Emergency from './Emergency'
import { emergencyContacts, emergencyTips } from '../guide/emergency'

describe('Emergency', () => {
  it('renders every emergency contact', () => {
    render(<Emergency />)
    for (const c of emergencyContacts) {
      expect(screen.getByText(c.label)).toBeInTheDocument()
    }
  })

  it('builds tel: links for contacts with a phone number', () => {
    render(<Emergency />)
    const calls = screen.getAllByRole('link', { name: /Llamar/ })
    expect(calls.length).toBe(emergencyContacts.filter((c) => c.phone).length)
    expect(calls[0]).toHaveAttribute('href', expect.stringContaining('tel:'))
  })

  it('shows the tips', () => {
    render(<Emergency />)
    expect(screen.getByText(emergencyTips[0])).toBeInTheDocument()
  })
})
