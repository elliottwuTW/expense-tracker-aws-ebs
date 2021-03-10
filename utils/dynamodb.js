const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.DYNAMODB_REGION })
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

module.exports = dynamodb
