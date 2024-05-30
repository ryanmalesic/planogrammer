import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4'>
      <div className='p-2'>Hello from About!</div>
    </div>
  )
}
