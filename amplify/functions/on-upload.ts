import type { StartExecutionCommandInput } from '@aws-sdk/client-sfn'
import type { S3Handler } from 'aws-lambda'

import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn'

// eslint-disable-next-line import/no-unresolved
import { env } from '$amplify/env/onUpload'

export const handler: S3Handler = async event => {
  const object =
    event.Records.map(record => ({ bucket: record.s3.bucket.name, key: record.s3.object.key }))[0] ?? undefined

  if (!object || !object.key.toLowerCase().endsWith('.csv')) {
    return
  }

  const sfnClient = new SFNClient({})

  const startExecutionCommandInput: StartExecutionCommandInput = {
    input: JSON.stringify(object),
    stateMachineArn: env.BOOK_PROCESSOR_STATE_MACHINE_ARN,
  }
  const startExecutionCommand = new StartExecutionCommand(startExecutionCommandInput)

  await sfnClient.send(startExecutionCommand)
}
