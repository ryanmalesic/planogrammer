import { ChangeEventHandler, useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'

interface UploadProps {
  open?: boolean
  onUpload: (file: File) => Promise<void>
}

export default function Upload(props: UploadProps) {
  const [error, setError] = useState<Error | null>(null)
  const [open, setOpen] = useState<boolean>(props.open ?? false)
  const [file, setFile] = useState<File | null>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFile(event.target?.files?.item(0) ?? null)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={open => setOpen(open)}
    >
      <DialogTrigger
        asChild
        onClick={() => setOpen(true)}
      >
        <Button>Upload Book</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Upload Book</DialogTitle>
          <DialogDescription>
            Choose a price book to upload items from. Click upload when you are done
          </DialogDescription>
        </DialogHeader>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='book'>Book</Label>
          <Input
            accept='text/csv'
            id='book'
            type='file'
            onChange={handleChange}
          />
          {error && <p className='text-sm text-destructive'>Error uploading book</p>}
        </div>
        <DialogFooter>
          <Button
            type='button'
            onClick={async () => {
              if (file) {
                try {
                  await props.onUpload(file)
                  setOpen(false)
                } catch (error) {
                  setError(error as Error)
                }
              }
            }}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
