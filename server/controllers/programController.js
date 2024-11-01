const { readData, writeData } = require('../config/database')

const getAllPrograms = async (req, res) => {
  const data = await readData()
  res.json(data.programs)
}

const createProgram = async (req, res) => {
  const data = await readData()
  const newProgram = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...req.body,
  }

  data.programs.push(newProgram)
  await writeData(data)
  res.status(201).json(newProgram)
}

module.exports = {
  getAllPrograms,
  createProgram,
}
