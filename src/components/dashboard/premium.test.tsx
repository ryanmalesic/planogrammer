import { render } from '@testing-library/react'

import Premium from './premium'

describe('premium', () => {
  it('renders without crashing', () => {
    render(<Premium />)
  })

  it('matches snapshot', () => {
    const result = render(<Premium />)
    expect(result).toMatchSnapshot()
  })
})
