import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { renderWithRouter } from './__utils__/renderWithRouter'
import 'jest-canvas-mock'
import { screen } from '@testing-library/react'

import { useSearchParamsState, SearchParamsStateType } from '../src/useSearchParamsState'

const testDefaults: SearchParamsStateType = {
  test: { type: 'string', default: 'Initial Value' },
}

const TestedComponent = () => {
  const [searchParams, setSearchParams] = useSearchParamsState(testDefaults)

  console.log('searchParams', searchParams)
  console.log(Object.entries(searchParams))

  return (
    <div>
      {Object.entries(searchParams).map(([key, value]) => (
        <span key={key} data-key={key}>
          {JSON.stringify(value)}
        </span>
      ))}
      <button
        onClick={() => {
          setSearchParams({ test: 'test' })
        }}
      >
        Click me
      </button>
    </div>
  )
}

const App = () => (
  <div>
    <Routes>
      <Route path='/' element={<TestedComponent />} />
    </Routes>
  </div>
)

describe('Common render', () => {
  it('renders without crashing', () => {
    renderWithRouter(<App />, 'http://localhost/')
    screen.debug()
    expect(screen.getByText('"Initial Value"')).toBeInTheDocument()
  })
})
