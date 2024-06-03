import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/items')({
  component: () => <Component />,
})

function Component() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold md:text-2xl'>Items</h1>
      </div>
      <Outlet />
    </>
  )
}
