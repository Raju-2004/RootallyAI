const express = require('express')
const router = express.Router()
const { getAllCombos, createCombo } = require('../controllers/comboController')
const asyncWrapper = require('../utils/asyncWrapper')

router.get('/', asyncWrapper(getAllCombos))
router.post('/', asyncWrapper(createCombo))

module.exports = router
