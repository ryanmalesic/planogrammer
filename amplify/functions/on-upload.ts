import type { StartExecutionCommandInput } from '@aws-sdk/client-sfn'
import type { S3Handler } from 'aws-lambda'

import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn'

export const handler: S3Handler = async event => {
  const object =
    event.Records.map(record => ({ bucket: record.s3.bucket.name, key: record.s3.object.key }))[0] ?? undefined

  if (!object) {
    return
  }

  const sfnClient = new SFNClient({})

  const startExecutionCommandInput: StartExecutionCommandInput = {
    input: JSON.stringify(object),
    stateMachineArn:
      'arn:aws:states:us-west-2:654654487600:stateMachine:amplify-d1i2uiv21e52zr-main-branch-b7e65a0b8e-book-statemachine',
  }
  const startExecutionCommand = new StartExecutionCommand(startExecutionCommandInput)

  await sfnClient.send(startExecutionCommand)
}
