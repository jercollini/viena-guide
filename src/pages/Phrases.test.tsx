import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Phrases from './Phrases'
import { phraseGroups } from '../guide/phrases'

describe('Phrases', () => {
  it('renders every phrase group', () => {
    render(<Phrases />)
    for (const group of phraseGroups) {
      expect(
        screen.getByRole('heading', { name: group.group }),
      ).toBeInTheDocument()
    }
  })

  it('shows the translation of a phrase', () => {
    render(<Phrases />)
    const first = phraseGroups[0].items[0]
    expect(screen.getByText(first.es)).toBeInTheDocument()
    expect(screen.getByText(first.local)).toBeInTheDocument()
  })
})
