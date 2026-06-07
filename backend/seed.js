require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/user')
const Task = require('./models/task')

async function seed() {
  await mongoose.connect(process.env.MONGODB)
  console.log('Conectado a MongoDB')

  await User.deleteMany({})
  await Task.deleteMany({})
  console.log('DB lista para pruebas')

  const password1 = await bcrypt.hash('David12345W', 10)
  const password2 = await bcrypt.hash('Oliver12345W', 10)

  await User.insertMany([
    { nombre: 'David Gutierrez', email: 'david.gutierrez@gmail.com', password: password1 },
    { nombre: 'Oliver Chambi', email: 'oliver.chambi@gmail.com', password: password2 }
  ])

  await Task.insertMany([
    {
      titulo: 'Entregar tarea de web',
      descripcion: 'Subir el proyecto todoListWeb al repositorio antes del lunes',
      completada: false
    },
    {
      titulo: 'Estudiar para parcial',
      descripcion: 'Repasar los temas de middlewares y autenticacion JWT',
      completada: false
    },
    {
      titulo: 'Reunion con Oliver',
      descripcion: 'Coordinar avances del proyecto con el compañero',
      completada: true
    },
    {
      titulo: 'Arreglar bug del login',
      descripcion: 'El token no se guardaba correctamente en el contexto',
      completada: true
    },
    {
      titulo: 'Agregar HTTPS al backend',
      descripcion: 'Configurar certificados pem con mkcert para localhost',
      completada: true
    }
  ])

  console.log('\nSeed completado')
  console.log('email: david.gutierrez@gmail.com | password: David12345W')
  console.log('email: oliver.chambi@gmail.com | password: Oliver12345W')

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error en seed:', err)
  process.exit(1)
})
