const express = require('express')
const router = express.Router()
const { getAllExercises } = require('../controllers/exerciseController')
const asyncWrapper = require('../utils/asyncWrapper')

router.get('/', asyncWrapper(getAllExercises))

module.exports = router
