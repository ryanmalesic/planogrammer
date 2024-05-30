import { render } from '@testing-library/react'

import Avatar from './avatar'

describe('avatar', () => {
  describe('closed', () => {
    it('renders without crashing', () => {
      render(
        <Avatar
          open={false}
          onOpenChange={() => {}}
        />
      )
    })

    it('matches snapshot', () => {
      const result = render(
        <Avatar
          open={false}
          onOpenChange={() => {}}
        />
      )
      expect(result).toMatchSnapshot()
    })
  })

  describe('open', () => {
    it('renders without crashing', () => {
      render(
        <Avatar
          open={true}
          onOpenChange={() => {}}
        />
      )
    })

    it('matches snapshot', () => {
      const result = render(
        <Avatar
          open={true}
          onOpenChange={() => {}}
        />
      )
      expect(result).toMatchSnapshot()
    })
  })
})
