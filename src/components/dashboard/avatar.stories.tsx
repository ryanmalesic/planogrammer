import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import Avatar from './avatar'

const meta = {
  title: 'Dashboard/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    open: false,
    onOpenChange: fn,
  },
}

export const Open: Story = {
  args: {
    open: true,
    onOpenChange: fn,
  },
}
