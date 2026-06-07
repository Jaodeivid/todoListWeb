require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const taskRoutes = require('./routes/taskRoutes')
const fileRoutes = require('./routes/fileRoutes')
const authRoutes = require('./routes/authRoutes')
const verificarToken = require('./middleware/authMiddleware')

const app = express()
const puerto = process.env.PORT

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('conectado a MongoDB'))
  .catch((error) => console.log('Error de conexion:', error))

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/tareas', verificarToken, taskRoutes)
app.use('/archivos', verificarToken, fileRoutes)

app.listen(puerto, () => {
  console.log(`servidor corriendo en http://localhost:${puerto}`)
})