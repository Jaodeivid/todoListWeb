const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body
    const existe = await User.findOne({ email })
    if (existe) return res.status(400).json({ mensaje: 'El email ya está registrado' })

    const hash = await bcrypt.hash(password, 10)
    const usuario = await new User({ nombre, email, password: hash }).save()

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const usuario = await User.findOne({ email })
    if (!usuario) return res.status(401).json({ mensaje: 'Credenciales incorrectas' })

    const valido = await bcrypt.compare(password, usuario.password)
    if (!valido) return res.status(401).json({ mensaje: 'Credenciales incorrectas' })

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' })
  }
}

module.exports = { registro, login }
