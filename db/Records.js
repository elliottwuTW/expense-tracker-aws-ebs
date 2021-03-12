const dynamodb = require('./dynamodb')

exports.getRecordsByGSI = (params) => {
  // params.TableName = process.env.RECORD_TABLE_NAME
  // params.IndexName = process.env.RECORD_TABLE_GSI_NAME
  return dynamodb.query(params).promise()
}
