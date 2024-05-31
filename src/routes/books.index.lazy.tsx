import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button.tsx'
import { DataTableDemo } from '@/components/ui/data-table.tsx'
import { bookDataTableColumnDef, booksQueryOptions } from '@/data/book.tsx'

export const Route = createLazyFileRoute('/books/')({
  component: Component,
  errorComponent: ErrorComponent,
})

function Component() {
  const { data: books } = useSuspenseQuery(booksQueryOptions)

  return (
    <DataTableDemo
      columns={bookDataTableColumnDef}
      data={books ?? []}
    />
  )
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  return (
    <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>Error loading books</h3>
        <p className='text-sm text-muted-foreground'> {error.message}</p>
        <Button
          className='mt-4'
          onClick={async () => {
            reset()
            await router.invalidate()
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
