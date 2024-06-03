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

export const fetchItems = async (category: string, date: string) => {
  const response = await client.models.Item.listItemByCategoryAndDate({ category, date: { eq: date } })
  const items = response.data
  if (!items) return null
  return items
}

export const itemsQueryOptions = (category?: string | null, date?: string | null) =>
  queryOptions({
    queryKey: ['items', [category, date]],
    queryFn: () => fetchItems(category!, date!),
    enabled: !!category && !!date,
  })

export const itemDataTableColumnDef: ColumnDef<Schema['Item']['type']>[] = [
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
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'upc',
    header: 'UPC',
  },
  {
    accessorFn: item => `${item.brand} ${item.name}`,
    header: 'Brand / Name',
  },
  {
    accessorFn: item => `${item.pack} @ ${item.size}`,
    header: 'Pack / Size',
  },
  {
    accessorFn: item => `${item.subCategory} -> ${item.variety}`,
    header: 'Category',
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
                Copy item name
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
