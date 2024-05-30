import { Link, useRouterState } from '@tanstack/react-router'
import { Book, Home, Package, Users } from 'lucide-react'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils.ts'

export default function Nav() {
  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      <NavLink
        icon={<Home className='h-4 w-4' />}
        to='/'
      />

      <NavLink
        icon={<Book className='h-4 w-4' />}
        to='/books'
      />

      <NavLink
        icon={<Package className='h-4 w-4' />}
        to='/items'
      />

      <NavLink
        icon={<Users className='h-4 w-4' />}
        to='/sections'
      />
    </nav>
  )
}

function NavLink({ to, icon }: { to: string; icon: ReactNode }) {
  const router = useRouterState()
  const pathname = router.location.pathname

  const title = to.split('/')[1].charAt(0).toUpperCase() + to.split('/')[1].slice(1)

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        pathname === to.toLowerCase() && 'bg-muted text-primary'
      )}
    >
      {icon}
      {title ? title : 'Home'}
    </Link>
  )
}
