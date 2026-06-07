const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ mensaje: 'Token requerido' })

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET)
    req.usuarioId = datos.id
    next()
  } catch {
    res.status(403).json({ mensaje: 'Token inválido o expirado' })
  }
}

module.exports = verificarToken
