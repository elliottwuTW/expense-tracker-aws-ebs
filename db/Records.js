const dynamodb = require('./dynamodb')

exports.getRecordsByGSI = (params) => {
  console.log('process.env.RECORD_TABLE_NAME: ', process.env.RECORD_TABLE_NAME)
  console.log('process.env.RECORD_TABLE_GSI_NAME: ', process.env.RECORD_TABLE_GSI_NAME)
  params.TableName = process.env.RECORD_TABLE_NAME
  params.IndexName = process.env.RECORD_TABLE_GSI_NAME
  console.log('params: ', params)
  return dynamodb.query(params).promise()
}
