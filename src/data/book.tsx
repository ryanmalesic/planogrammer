import type { Schema } from '@/../amplify/data/resource'
import type { ColumnDef } from '@tanstack/react-table'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { queryOptions } from '@tanstack/react-query'
import { generateClient } from 'aws-amplify/data'

import { Button } from '@/components/ui/button.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'

const client = generateClient<Schema>()

export const fetchBooks = async () => {
  const response = await client.models.Book.list()
  const books = response.data
  if (!books) return null
  return books
}

export const booksQueryOptions = queryOptions({
  queryKey: ['books'],
  queryFn: () => fetchBooks(),
})

export const bookDataTableColumnDef: ColumnDef<Schema['Book']['type']>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label='Select all'
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label='Select row'
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'date',
    header: 'Run Date',
  },
  {
    accessorKey: 'items',
    header: 'Items',
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ row }) => (row.getValue('categories') as string[]).length,
  },
  {
    accessorKey: 'createdAt',
    header: 'Uploaded At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string)
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original

      return (
        <div className='flex flex-shrink items-center justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='h-8 w-8 p-0'
                variant='ghost'
              >
                <span className='sr-only'>Open menu</span>
                <DotsHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(book.name)}>
                Copy book name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View items</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
