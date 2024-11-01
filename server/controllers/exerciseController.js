const { readData } = require('../config/database')

const getAllExercises = async (req, res) => {
  const data = await readData()
  res.json(data.exercises)
}

module.exports = {
  getAllExercises,
}
