const express = require('express')
const app = express()
const port = 4848
const cafeteras = require('./cafeteras.json')

const getCafeteraById = cafeteraId => cafeteras.find(cafetera => cafetera.id === cafeteraId)

app.get('/', (req, res) => {
  res.send('La Cafetera API esta operativa! :D')
})

app.get('/cafeteras', (req, res) => {
  res.json(cafeteras)
})

app.get('/cafetera/:cafeteraId', (req, res) => {
  try {
    const cafetera = getCafeteraById(req.params.cafeteraId)
    if (cafetera) {
      res.json(cafetera)
    } else {
      res.status(404).json({ message: 'No se pudo encontrar una cafetera con ese ID' })
    }

  } catch (e) {
    res.status(400).json({ message: 'Algo salio mal al intentar obtener esa cafetera' })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})