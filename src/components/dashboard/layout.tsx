import { ReactNode } from 'react'

import Avatar from '@/components/dashboard/avatar.tsx'
import Nav from '@/components/dashboard/nav.tsx'
import Premium from '@/components/dashboard/premium.tsx'
import SearchBar from '@/components/dashboard/search.tsx'
import Title from '@/components/dashboard/title.tsx'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <Title />
          <div className='flex-1'>
            <Nav />
          </div>
          <Premium />
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <div className='w-full flex-1'>
            <SearchBar />
          </div>
          <Avatar
            open={false}
            onOpenChange={() => {}}
          />
        </header>
        <main className='flex flex-1 flex-col gap-2 p-2 lg:gap-4 lg:p-4'>{children}</main>
      </div>
    </div>
  )
}
