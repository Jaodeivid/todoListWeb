require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')

const taskRoutes = require('./routes/taskRoutes')
const fileRoutes = require('./routes/fileRoutes')
const authRoutes = require('./routes/authRoutes')
const verificarToken = require('./middleware/authMiddleware')

const app = express()
const puerto = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('conectado a MongoDB'))
  .catch((error) => console.log('Error de conexion:', error))

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/tareas', verificarToken, taskRoutes)
app.use('/archivos', verificarToken, fileRoutes)

const opciones = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}

https.createServer(opciones, app).listen(puerto, () => {
  console.log(`Servidor corriendo en https://localhost:${puerto}`)
})
