const express = require('express')
const router = express.Router()
const { getAllPrograms, createProgram } = require('../controllers/programController')
const asyncWrapper = require('../utils/asyncWrapper')

router.get('/', asyncWrapper(getAllPrograms))
router.post('/', asyncWrapper(createProgram))

module.exports = router
