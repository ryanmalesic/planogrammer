import type { Meta, StoryObj } from '@storybook/react'

import withRouter from '../../../.storybook/router.tsx'

import Nav from './nav'

const meta = {
  title: 'Dashboard/Nav',
  component: Nav,
  decorators: [
    (Story, args) => withRouter(Story, args),
    Story => (
      <div className='w-72'>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Nav>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
