import { defineStorage } from '@aws-amplify/backend'

export const storage = defineStorage({
  name: 'planogrammer',
  access: allow => ({ 'books/*': [allow.authenticated.to(['read', 'write'])] }),
})
