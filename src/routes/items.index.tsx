import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { createFileRoute, redirect, useLoaderData, useNavigate, useRouter, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button.tsx'
import { DataTableDemo } from '@/components/ui/data-table.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { latestBookQueryOptions } from '@/data/book.tsx'
import { itemDataTableColumnDef, itemsQueryOptions } from '@/data/item.tsx'
import { queryClient } from '@/main.tsx'

export const Route = createFileRoute('/items/')({
  validateSearch: search =>
    search as {
      category?: string
      date?: string
    },
  loaderDeps: ({ search: { category, date } }) => ({
    category,
    date,
  }),
  loader: async ({ deps: { category, date } }) => {
    if (!category || !date) {
      const latestBook = await queryClient.ensureQueryData(latestBookQueryOptions)
      throw redirect({
        to: '/items',
        search: {
          category: category ?? latestBook!.categories[0]!,
          date: date ?? latestBook!.date!,
        },
      })
    } else {
      const book = await queryClient.ensureQueryData(latestBookQueryOptions)
      const items = await queryClient.ensureQueryData(itemsQueryOptions(category, date))

      return { book, items }
    }
  },
  component: Component,
  errorComponent: ErrorComponent,
})

function Component() {
  const search = useSearch({ from: '/items/' })
  const navigate = useNavigate()

  const { book, items } = useLoaderData({ from: '/items/' })

  const sortedItems = items?.sort((a, b) =>
    `${a.subCategory}${a.variety}${a.brand}${a.name}${a.size}${a.pack}`.localeCompare(
      `${b.subCategory}${b.variety}${b.brand}${b.name}${b.size}${b.pack}`
    )
  )

  return (
    <>
      <Select
        defaultValue={search.category}
        onValueChange={async value => {
          await navigate({ to: '/items', search: { category: value, date: search.date } })
        }}
      >
        <SelectTrigger className='w-[360px]'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
        <SelectContent>
          {(book?.categories ?? []).map(category => (
            <SelectItem
              key={category}
              value={category!}
            >
              {category}
            </SelectItem>
          ))}
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
        </SelectContent>
      </Select>

      <DataTableDemo
        columns={itemDataTableColumnDef}
        data={sortedItems ?? []}
      />
    </>
  )
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter({})
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  return (
    <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>Error loading items</h3>
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
