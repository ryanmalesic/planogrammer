import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className='flex h-dvh w-dvw flex-col items-center justify-center'>
      <div className='flex w-full gap-2 p-2'>
        <Link
          className='[&.active]:font-bold'
          to='/'
        >
          Home
        </Link>{' '}
        <Link
          className='[&.active]:font-bold'
          to='/about'
        >
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
