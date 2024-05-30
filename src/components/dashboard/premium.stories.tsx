import type { Meta, StoryObj } from '@storybook/react'

import Premium from './premium'

const meta = {
  title: 'Dashboard/Premium',
  component: Premium,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Premium>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
