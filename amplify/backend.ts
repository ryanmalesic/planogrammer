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
    resources: [
      'arn:aws:states:us-west-2:654654487600:stateMachine:amplify-d1i2uiv21e52zr-main-branch-b7e65a0b8e-book-statemachine',
    ],
  })
)
