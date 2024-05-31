import { a, type ClientSchema, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Book: a
    .model({
      name: a.string().required(),
      date: a.date().required(),
      items: a.integer().required(),
      categories: a.string().array().required(),
    })
    .authorization(allow => [allow.authenticated()])
    .identifier(['name']),
  Item: a
    .model({
      id: a.id().required(),
      date: a.date().required(),
      upc: a.string().required(),
      brand: a.string().required(),
      name: a.string().required(),
      pack: a.string().required(),
      size: a.string().required(),
      category: a.string().required(),
      subCategory: a.string().required(),
      variety: a.string().required(),
    })
    .authorization(allow => [allow.authenticated()])
    .identifier(['id', 'date'])
    .secondaryIndexes(index => [index('upc').sortKeys(['date']), index('category').sortKeys(['date'])]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
