import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// test utils file
export const renderWithRouter = (ui: React.ReactElement, url: string) => {
  const urlObj = new URL('', url)
  window.history.pushState({ test: 234 }, '', urlObj)

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  }
}
