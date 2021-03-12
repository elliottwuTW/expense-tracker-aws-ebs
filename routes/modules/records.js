const express = require('express')
const router = express.Router()

// const Record = require('../../models/record.js')
const query = require('../../middleware/query')
const saveQuerySettingToCookie = require('../../middleware/saveQuerySettingToCookie')

const { getMonthlyRecords, getNewExpensePage, getNewIncomePage, createRecord, getRecordPage, updateRecord, deleteRecord } = require('../../controllers/records')

router.get('/', query, saveQuerySettingToCookie, getMonthlyRecords)
router.get('/new-expense', getNewExpensePage)
router.get('/new-income', getNewIncomePage)
router.get('/:id/edit', getRecordPage)
router.post('/', createRecord)
router.put('/:id', updateRecord)
router.delete('/:id', deleteRecord)

module.exports = router
