import { createFileRoute } from '@tanstack/react-router'

import { latestBookQueryOptions } from '@/data/book.tsx'
import { queryClient } from '@/main.tsx'

export const Route = createFileRoute('/sections/new')({
  loader: async () => {
    const latestBook = await queryClient.ensureQueryData(latestBookQueryOptions)
    return { book: latestBook }
  },
})
