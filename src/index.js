const express = require('express')
const app = express()
const port = 4848

app.get('/', (req, res) => {
  res.send('Proyecto super ultra secreto de la NASA')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})