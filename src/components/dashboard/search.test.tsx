import { render } from '@testing-library/react'

import Search from './search'

describe('search', () => {
  it('renders without crashing', () => {
    render(<Search />)
  })

  it('matches snapshot', () => {
    const result = render(<Search />)
    expect(result).toMatchSnapshot()
  })
})
