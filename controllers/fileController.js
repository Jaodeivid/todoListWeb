const fs = require('fs')
const path = require('path')

const carpetaUploads = 'uploads/'

const listarArchivos = (req, res) => {
  try {
    const archivos = fs.readdirSync(carpetaUploads)
    res.set('X-Total-Archivos', archivos.length)
    res.set('X-Resource', 'archivos')
    res.set('Cache-Control', 'public, max-age=30')
    res.json({ archivos })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar los archivos' })
  }
}

const subirArchivo = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se envió ningún archivo' })
    }
    res.set('X-Filename', req.file.originalname)
    res.set('X-File-Size', req.file.size.toString())
    res.set('Location', `/archivos/bajar/${req.file.originalname}`)
    res.set('Cache-Control', 'no-store')
    res.status(201).json({ mensaje: 'Archivo subido', archivo: req.file.originalname })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al subir el archivo' })
  }
}

const bajarArchivo = (req, res) => {
  try {
    const rutaArchivo = path.join(carpetaUploads, req.params.nombre)
    if (!fs.existsSync(rutaArchivo)) {
      return res.status(404).json({ mensaje: 'Archivo no encontrado' })
    }
    const stats = fs.statSync(rutaArchivo)
    res.set('X-Filename', req.params.nombre)
    res.set('Content-Length', stats.size.toString())
    res.set('Last-Modified', stats.mtime.toUTCString())
    res.set('Cache-Control', 'public, max-age=3600')
    res.download(rutaArchivo)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al descargar el archivo' })
  }
}

const eliminarArchivo = (req, res) => {
  try {
    const rutaArchivo = path.join(carpetaUploads, req.params.nombre)
    if (!fs.existsSync(rutaArchivo)) {
      return res.status(404).json({ mensaje: 'Archivo no encontrado' })
    }
    fs.unlinkSync(rutaArchivo)
    res.set('X-Deleted-File', req.params.nombre)
    res.json({ mensaje: 'Archivo eliminado' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el archivo' })
  }
}

module.exports = { listarArchivos, subirArchivo, bajarArchivo, eliminarArchivo }