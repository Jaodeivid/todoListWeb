const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
  listarArchivos,
  subirArchivo,
  bajarArchivo,
  eliminarArchivo
} = require('../controllers/fileController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname)
})
const upload = multer({ storage })

router.get('/', listarArchivos)
router.post('/subir', upload.single('archivo'), subirArchivo)
router.get('/bajar/:nombre', bajarArchivo)
router.delete('/:nombre', eliminarArchivo)

module.exports = router