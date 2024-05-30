import { Link } from '@tanstack/react-router'
import { Bell, Package2 } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'

export default function Title() {
  return (
    <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
      <Link
        className='flex items-center gap-2 font-semibold'
        to='/'
      >
        <Package2 className='h-6 w-6' />
        <span>Planogrammer</span>
      </Link>
      <Button
        className='ml-auto h-8 w-8'
        size='icon'
        variant='outline'
      >
        <Bell className='h-4 w-4' />
        <span className='sr-only'>Toggle notifications</span>
      </Button>
    </div>
  )
}
