import { render, screen } from '@testing-library/react'

import About from '@/pages/about'

describe('About page', () => {
  describe('Render method', () => {
    it('should have a paragraph of `Lorem ipsum', () => {
      render(<About />)
      const paragraph = screen.getByText(/Lorem ipsum/)

      expect(paragraph).toBeInTheDocument()
    })
  })
})
