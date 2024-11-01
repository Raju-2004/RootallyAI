const { readData, writeData } = require('../config/database')

const getAllCombos = async (req, res) => {
  const data = await readData()
  res.json(data.combos)
}

const createCombo = async (req, res) => {
  const data = await readData()
  const newCombo = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...req.body,
  }

  data.combos.push(newCombo)
  await writeData(data)
  res.status(201).json(newCombo)
}

module.exports = {
  getAllCombos,
  createCombo,
}
