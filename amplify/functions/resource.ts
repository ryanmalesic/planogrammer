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
})
