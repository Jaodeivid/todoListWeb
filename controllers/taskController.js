const Task = require('../models/task')

const getTasks = async (req, res) => {
  try {
    const tareas = await Task.find()
    const ultimaModificacion = tareas.reduce(
      (max, t) => (t.updatedAt > max ? t.updatedAt : max),
      new Date(0)
    )
    res.set('X-Total-Count', tareas.length)
    res.set('X-Resource', 'tareas')
    res.set('Last-Modified', ultimaModificacion.toUTCString())
    res.set('Cache-Control', 'public, max-age=60')
    res.json(tareas)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas' })
  }
}

const getTaskById = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id)
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' })
    }
    // ETag: un "identificador" único de esta versión del recurso
    const etag = `"${tarea._id}-${tarea.updatedAt || tarea.fechaCreacion}"`
    // Si el cliente ya tiene esta versión, no se la mandamos de nuevo
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end() // Not Modified
    }
    // Headers de metadatos
    res.set('ETag', etag)
    res.set('X-Task-ID', tarea._id.toString())
    res.set('X-Completada', tarea.completada.toString())
    res.set('Cache-Control', 'private, max-age=120')
    res.json(tarea)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la tarea' })
  }
}

const crearTask = async (req, res) => {
  try {
    const nuevaTask = new Task(req.body)
    const resultado = await nuevaTask.save()
    // Metadatos de lo que se creó
    res.set('X-Task-ID', resultado._id.toString())
    res.set('Location', `/tareas/${resultado._id}`)
    res.set('Cache-Control', 'no-store')
    res.status(201).json(resultado)
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la tarea' })
  }
}

const actualizarTask = async (req, res) => {
  try {
    const taskActualizada = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!taskActualizada) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' })
    }
    const etag = `"${taskActualizada._id}-${taskActualizada.updatedAt}"`
    res.set('ETag', etag)
    res.set('Cache-Control', 'no-cache')
    res.json(taskActualizada)
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la tarea' })
  }
}

const eliminarTask = async (req, res) => {
  try {
    const eliminada = await Task.findByIdAndDelete(req.params.id)
    if (!eliminada) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' })
    }
    res.set('X-Deleted-ID', req.params.id)
    res.json({ mensaje: 'Tarea eliminada' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la tarea' })
  }
}

module.exports = { getTasks, getTaskById, crearTask, actualizarTask, eliminarTask }
