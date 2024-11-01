const express = require('express')
const router = express.Router()
const { getAllCategories, getCategoryExercises } = require('../controllers/categoryController')
const asyncWrapper = require('../utils/asyncWrapper')

router.get('/', asyncWrapper(getAllCategories))
router.get('/:categoryId/exercises', asyncWrapper(getCategoryExercises))

module.exports = router
