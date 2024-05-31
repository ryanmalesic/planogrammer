import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { uploadData } from 'aws-amplify/storage'

import Upload from '@/components/books/upload.tsx'
import { queryClient } from '@/main.tsx'

export const Route = createLazyFileRoute('/books')({
  component: () => <Component />,
})

function Component() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold md:text-2xl'>Books</h1>
        <Upload
          onUpload={async file => {
            await uploadData({
              path: `books/${file.name}`,
              data: file,
            }).result
            await queryClient.invalidateQueries({ queryKey: ['books'] })
          }}
        />
      </div>
      <Outlet />
    </>
  )
}
