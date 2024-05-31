import type { Schema } from '../data/resource'
import type { NodeJsClient } from '@smithy/types'
import type { Handler } from 'aws-lambda'

import {
  GetObjectCommand,
  type GetObjectCommandInput,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { parse } from 'csv-parse'
import invariant from 'tiny-invariant'

const KarnsItemColumns = [
  'customerNumber',
  'runDate',
  'effDate',
  'zone',
  'prodCode',
  'brand',
  'description',
  'pack',
  'size',
  'cusPrd',
  'poaIdent',
  'itemCode',
  'restricted',
  'dealPackInd',
  'cripPoa',
  'slowMover',
  'fullCaseInd',
  'dsdInd',
  'thirteenWeek',
  'akaType',
  'upc',
  'allow',
  'allowInd',
  'allowEndDate',
  'cost',
  'costInd',
  'netCost',
  'unitCost',
  'netUnitCost',
  'zoneNbr',
  'baseZoneMulti',
  'baseZoneSrp',
  'baseZoneInd',
  'baseZonePercent',
  'baseZonePercentInd',
  'rdcdZoneMulti',
  'rdcdZoneSrp',
  'rdcdZoneInd',
  'rdcdZonePercent',
  'rdcdZonePercentInd',
  'baseCripMulti',
  'baseCripSrp',
  'baseCripSrpInd',
  'baseCripPercent',
  'baseCripPercentInd',
  'rdcdCripMulti',
  'rdcdCripSrp',
  'rdcdCripSrpInd',
  'rdcdCripPercent',
  'rdcdCripPercentInd',
  'rdcdSrpInd',
  'endDate',
  'palletQuantity',
  'itemAuth',
  'itemStatus',
  'categoryClass',
  'categoryClassDescription',
  'classId',
  'classDescription',
  'subClassId',
  'subClassDescription',
  'varietyId',
  'varietyDescription',
  '',
] as const

type KarnsItem = { [key in (typeof KarnsItemColumns)[number]]: string }
type Item = Schema['Item']['type']

const karnsItemToItem = (karnsItem: KarnsItem): Item => {
  return {
    id: karnsItem.itemCode,
    date: new Date(karnsItem.runDate).toISOString().slice(0, 10),
    upc: karnsItem.upc,
    brand: karnsItem.brand,
    name: karnsItem.description,
    pack: karnsItem.pack,
    size: karnsItem.size,
    category: karnsItem.classDescription,
    subCategory: karnsItem.subClassDescription,
    variety: karnsItem.varietyDescription,
    createdAt: new Date(karnsItem.runDate).toISOString(),
    updatedAt: new Date(karnsItem.runDate).toISOString(),
  }
}

export const handler: Handler = async event => {
  const { bucket, key } = event
  invariant(bucket, 'bucket is missing')
  invariant(key, 'key is missing')

  const s3Client = new S3Client() as NodeJsClient<S3Client>

  console.log({ bucket, key })
  const getObjectCommandInput: GetObjectCommandInput = { Bucket: bucket, Key: key }
  const getObjectCommand = new GetObjectCommand(getObjectCommandInput)
  const getObjectCommandOutput = await s3Client.send(getObjectCommand)

  invariant(getObjectCommandOutput.Body, 'getObjectCommandOutput.Body is undefined')
  const webStream = getObjectCommandOutput.Body

  const parser = webStream.pipe(
    parse({
      columns: KarnsItemColumns as unknown as string[],
      delimiter: ',',
      fromLine: 4,
      relaxQuotes: true,
      trim: true,
    })
  )

  const categories: Set<string> = new Set()
  const ids: Set<string> = new Set()
  const items: Item[] = []

  for await (const record of parser) {
    const item = karnsItemToItem(record as KarnsItem)
    if (!ids.has(item.id)) {
      categories.add(item.category)
      ids.add(item.id)
      items.push(item)
    }
  }

  const putObjectCommandInput: PutObjectCommandInput = {
    Body: JSON.stringify(items),
    Bucket: bucket,
    Key: key.toLowerCase().replace('.csv', '.json'),
  }
  const putObjectCommand = new PutObjectCommand(putObjectCommandInput)
  await s3Client.send(putObjectCommand)

  return {
    bucket,
    key: key.toLowerCase().replace('.csv', '.json'),
    date: items[0].createdAt.slice(0, 10),
    items: items.length,
    categories: [...categories].sort((a, b) => a.localeCompare(b)),
  }
}
