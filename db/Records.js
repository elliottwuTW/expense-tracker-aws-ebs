const { v4: uuidv4 } = require('uuid')

const dynamodb = require('./dynamodb')

exports.getRecordsByUserIdDateIndex = (params) => {
  params.TableName = process.env.RECORD_TABLE_NAME
  params.IndexName = 'UserId-date-index'
  // sort by date in the reverse order
  params.ScanIndexForward = false
  return dynamodb.query(params).promise()
}

exports.createRecord = (recordInfo) => {
  return dynamodb.put({
    TableName: process.env.RECORD_TABLE_NAME,
    Item: {
      id: uuidv4(),
      ...recordInfo
    }
  }).promise()
}
