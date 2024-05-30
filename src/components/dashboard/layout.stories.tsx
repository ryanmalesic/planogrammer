import type { Meta, StoryObj } from '@storybook/react'

import withRouter from '../../../.storybook/router.tsx'

import Layout from './layout'

const meta = {
  title: 'Dashboard/Layout',
  component: Layout,
  decorators: [(Story, args) => withRouter(Story, args)],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'children',
  },
}
