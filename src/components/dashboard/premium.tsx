import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'

export default function Premium() {
  return (
    <div className='mt-auto p-4'>
      <Card>
        <CardHeader className='p-2 pt-0 md:p-4'>
          <CardTitle>Upgrade to Pro</CardTitle>
          <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
        </CardHeader>
        <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
          <Button
            className='w-full'
            size='sm'
          >
            Upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
