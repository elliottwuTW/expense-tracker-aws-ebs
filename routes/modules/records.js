const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const query = require('../../middleware/query')

const { getMonthlyRecords, getNewRecordPage, createRecord, getRecordPage, updateRecord, deleteRecord } = require('../../controllers/records')

router.get('/', query(Record, 'category'), getMonthlyRecords)
router.get('/new', getNewRecordPage)
router.get('/:id/edit', getRecordPage)
router.post('/', createRecord)
router.put('/:id', updateRecord)
router.delete('/:id', deleteRecord)

module.exports = router
