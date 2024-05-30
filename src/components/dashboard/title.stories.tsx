import type { Meta, StoryObj } from '@storybook/react'

import withRouter from '../../../.storybook/router.tsx'

import Title from './title'

const meta = {
  title: 'Dashboard/Title',
  component: Title,
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
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
