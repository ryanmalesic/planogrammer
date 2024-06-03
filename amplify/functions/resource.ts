import { defineFunction } from '@aws-amplify/backend'

export const convert = defineFunction({
  name: 'convert',
  entry: './convert.ts',
  timeoutSeconds: 30,
})

export const onUpload = defineFunction({
  name: 'onUpload',
  entry: './on-upload.ts',
  timeoutSeconds: 5,
  environment: {
    BOOK_PROCESSOR_STATE_MACHINE_ARN: process.env.BOOK_PROCESSOR_STATE_MACHINE_ARN as string,
  },
})
