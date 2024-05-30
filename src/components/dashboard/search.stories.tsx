import type { Meta, StoryObj } from '@storybook/react'

import Search from './search'

const meta = {
  title: 'Dashboard/Search',
  component: Search,
  decorators: [
    Story => (
      <header className='lg:p-6'>
        <div className='w-full flex-1'>
          <Story />
        </div>
      </header>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
