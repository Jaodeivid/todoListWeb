const express = require('express')
const router = express.Router()
const {
  getTasks,
  crearTask,
  actualizarTask,
  eliminarTask
} = require('../controllers/taskController')

router.get('/', getTasks)
router.post('/', crearTask)
router.put('/:id', actualizarTask)
router.delete('/:id', eliminarTask)

module.exports = router
