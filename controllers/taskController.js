const Task = require('../models/task')

const getTasks = async (req, res) => {
  try {
    const tareas = await Task.find()
    res.json(tareas)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas' })
  }
}

const crearTask = async (req, res) => {
  try {
    const nuevaTask = new Task(req.body)
    const resultado = await nuevaTask.save()
    res.status(201).json(resultado)
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la tarea' })
  }
}

const actualizarTask = async (req, res) => {
  try {
    const taskActualizada = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(taskActualizada)
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la tarea' })
  }
}

const eliminarTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ mensaje: 'Tarea eliminada' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la tarea' })
  }
}

module.exports = { getTasks, crearTask, actualizarTask, eliminarTask }
