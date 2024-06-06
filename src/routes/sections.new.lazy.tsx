import type { Schema } from '../../amplify/data/resource.ts'

import { useQueries } from '@tanstack/react-query'
import { createLazyFileRoute, useLoaderData } from '@tanstack/react-router'
import { generateClient } from 'aws-amplify/api'
import { FormEventHandler, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/button.tsx'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.tsx'
import { fetchItems } from '@/data/item.tsx'

const client = generateClient<Schema>()

export const Route = createLazyFileRoute('/sections/new')({
  component: () => <Component />,
})

function Component() {
  const [section, setSection] = useState<Schema['Item']['type'][][]>([[]])
  const [selectedShelf, setSelectedShelf] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [itemId, setItemId] = useState<string>('')

  const { book } = useLoaderData({ from: '/sections/new' })
  const itemsQueries = useQueries({
    queries: categories.map(category => {
      return {
        enabled: !!book,
        queryKey: ['items', [category, book!.date]],
        queryFn: () => fetchItems(category, book!.date),
      }
    }),
  })

  const handleItemAddSubmit: FormEventHandler = async event => {
    event.preventDefault()

    for (const query of itemsQueries) {
      if (query.data?.find(item => item.id === itemId)) {
        const item = query.data.find(item => item.id === itemId)
        setSection(prev => [
          ...prev.slice(0, selectedShelf),
          [...(prev.at(selectedShelf) ?? []), item!],
          ...prev.slice(selectedShelf + 1),
        ])
        setItemId('')
        return
      }
      if (query.data?.find(item => item.upc === itemId)) {
        const item = query.data.find(item => item.upc === itemId)
        setSection(prev => [
          ...prev.slice(0, selectedShelf),
          [...(prev.at(selectedShelf) ?? []), item!],
          ...prev.slice(selectedShelf + 1),
        ])
        setItemId('')
        return
      }
    }

    if (book) {
      let item: Schema['Item']['type'] | null = null
      const result = await client.models.Item.get({ id: itemId, date: book.date })
      if (!result.data) {
        const result = await client.models.Item.listItemByUpcAndDate({ upc: itemId, date: { eq: book.date } })
        if (!result.data) {
          setItemId('')
          return
        }
        item = result.data.sort((a, b) => b.date.localeCompare(a.date)).at(0) ?? null
      } else {
        item = result.data
      }

      if (item) {
        setCategories(prev => [...new Set([...prev, item.category])])
        setSection(prev => [
          ...prev.slice(0, selectedShelf),
          [...(prev.at(selectedShelf) ?? []), item],
          ...prev.slice(selectedShelf + 1),
        ])
      }
    }

    setItemId('')
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold md:text-2xl'>New Section</h1>
      </div>

      <form
        className='flex items-center justify-between'
        onSubmit={handleItemAddSubmit}
      >
        <div className='flex items-center gap-4'>
          <Input
            required
            className='min-w-72 max-w-72'
            maxLength={12}
            minLength={7}
            name='upc'
            placeholder='Add an item by ID or UPC...'
            type='text'
            value={itemId}
            onChange={e => setItemId(e.target.value)}
          />
          <Button type='submit'>Add Item</Button>
          <Button
            type='button'
            onClick={() => {
              setSection(prev => [...prev.slice(0, selectedShelf + 1), [], ...prev.slice(selectedShelf + 1)])
              setSelectedShelf(prev => prev + 1)
            }}
          >
            Add Shelf
          </Button>
        </div>

        <div className='flex gap-4'>
          <Button
            type='button'
            onClick={() => {
              const rows = section.reduce(
                (prev, curr) => prev + curr.reduce((prev, curr) => prev + curr.id + ',', '').slice(0, -1) + '\n',
                ''
              )
              const csvContent = `data:text/csv;charset=utf-8,${rows}`
              const uriData = encodeURI(csvContent)

              const link = document.createElement('a')
              link.href = uriData
              link.download = `section_${new Date().toISOString()}.csv`

              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            Save as CSV
          </Button>
        </div>
      </form>

      <div className='w-full flex-1 rounded border'>
        {section.map((shelf, index) => (
          <ScrollArea
            key={index}
            className={twMerge(' whitespace-nowrap border-b p-4', selectedShelf === index && 'border-2 border-ring')}
            onClick={() => setSelectedShelf(index)}
          >
            <div className='flex gap-4'>
              {shelf.map((item, index) => (
                <Card
                  key={index}
                  className='min-w-[260px] max-w-[260px]'
                >
                  <CardHeader>
                    <CardTitle className='text-base font-medium'>{item.name}</CardTitle>
                    <CardDescription>
                      <span className='block whitespace-pre-wrap'>
                        {item.brand} - {item.pack} @ {item.size}
                      </span>
                      <span className='block'>
                        {item.id} - {item.upc}
                      </span>
                      <span className='block whitespace-pre-wrap'>
                        {item.subCategory} / {item.variety}
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        ))}
      </div>
    </>
  )
}
