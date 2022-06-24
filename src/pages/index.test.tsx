import { render, screen } from '@testing-library/react'

import Index from './index'

describe('Index page', () => {
  describe('Render method', () => {
    it('should have a text `Welcome to', () => {
      render(<Index />)
      const paragraph = screen.getByText(/Welcome to/)

      expect(paragraph).toBeInTheDocument()
    })
  })
})
