const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

module.exports = dynamodb
