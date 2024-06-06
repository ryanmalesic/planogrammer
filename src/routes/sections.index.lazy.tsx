import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'

import { Button } from '@/components/ui/button.tsx'

export const Route = createLazyFileRoute('/sections/')({
  component: () => <Component />,
})

function Component() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold md:text-2xl'>Sections</h1>
        <Link to='/sections/new'>
          <Button>New Section</Button>
        </Link>
      </div>
      <Outlet />
    </>
  )
}
