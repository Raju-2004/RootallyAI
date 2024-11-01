const fs = require('fs').promises
const path = require('path')

const readData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading data:', error)
    throw new Error('Database read error')
  }
}

const writeData = async (data) => {
  try {
    await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing data:', error)
    throw new Error('Database write error')
  }
}

module.exports = { readData, writeData }
