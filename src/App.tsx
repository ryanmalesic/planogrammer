import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex h-dvh w-dvw flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-semibold'>Vite + React</h1>
      <Button
        variant='default'
        onClick={() => setCount(count => count + 1)}
      >
        count is {count}
      </Button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  )
}

export default App
