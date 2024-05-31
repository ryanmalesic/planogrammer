import { defineStorage } from '@aws-amplify/backend'

import { convert, onUpload } from '../functions/resource'

export const storage = defineStorage({
  name: 'planogrammer',
  access: allow => ({
    'books/*': [allow.authenticated.to(['read', 'write']), allow.resource(convert).to(['read', 'write'])],
  }),
  triggers: {
    onUpload: onUpload,
  },
})
