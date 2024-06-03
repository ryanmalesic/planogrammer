import { defineBackend } from '@aws-amplify/backend'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'

import { auth } from './auth/resource'
import { data } from './data/resource'
import { convert, onUpload } from './functions/resource'
import { storage } from './storage/resource'

const backend = defineBackend({
  auth,
  data,
  storage,
  convert,
  onUpload,
})

backend.onUpload.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['states:StartExecution'],
    resources: [process.env.BOOK_PROCESSOR_STATE_MACHINE_ARN as string],
  })
)
