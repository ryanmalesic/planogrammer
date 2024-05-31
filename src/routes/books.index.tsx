import { createFileRoute } from '@tanstack/react-router'

import { booksQueryOptions } from '@/data/book.tsx'
import { queryClient } from '@/main.tsx'

export const Route = createFileRoute('/books/')({
  loader: async () => queryClient.ensureQueryData(booksQueryOptions),
})
