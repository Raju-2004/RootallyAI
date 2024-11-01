const { readData } = require('../config/database')

const getAllCategories = async (req, res) => {
  const data = await readData()
  res.json(data.categories)
}

const getCategoryExercises = async (req, res) => {
  const data = await readData()
  const categoryExercises = data.exercises.filter((exercise) => exercise.categoryId === req.params.categoryId)
  res.json(categoryExercises)
}

module.exports = {
  getAllCategories,
  getCategoryExercises,
}
