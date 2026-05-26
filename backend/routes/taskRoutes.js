const express = require('express')
const router = express.Router()
const {
  getTasks,
  getTaskById,
  crearTask,
  actualizarTask,
  eliminarTask
} = require('../controllers/taskController')

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.post('/', crearTask)
router.put('/:id', actualizarTask)
router.delete('/:id', eliminarTask)

module.exports = router
