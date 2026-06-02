import { useState, useEffect } from 'react'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import { getTasks, crearTask, actualizarTask, eliminarTask } from '../services/taskService'

function TaskList() {
  const [tareas, setTareas] = useState([])
  const [tareaEditar, setTareaEditar] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getTasks().then(data => {
      setTareas(data)
      setCargando(false)
    })
  }, [])

  const handleGuardar = async (datos) => {
    if (tareaEditar) {
      setTareas(prev => prev.map(t =>
        t._id === tareaEditar._id ? { ...t, ...datos } : t
      ))
      setTareaEditar(null)
      actualizarTask(tareaEditar._id, datos)
    } else {
      const idTemporal = 'temp-' + Date.now()
      const tareaTemp = { _id: idTemporal, completada: false, ...datos }
      setTareas(prev => [...prev, tareaTemp])
      const nueva = await crearTask(datos)
      setTareas(prev => prev.map(t => t._id === idTemporal ? nueva : t))
    }
  }

  const handleEliminar = (id) => {
    setTareas(prev => prev.filter(t => t._id !== id))
    eliminarTask(id)
  }

  const handleToggle = (id, completadaActual) => {
    setTareas(prev => prev.map(t =>
      t._id === id ? { ...t, completada: !completadaActual } : t
    ))
    actualizarTask(id, { completada: !completadaActual })
  }

  return (
    <div className="task-list-container">
      <h1>Lista de Tareas</h1>

      <TaskForm
        onGuardar={handleGuardar}
        tareaEditar={tareaEditar}
        onCancelar={() => setTareaEditar(null)}
      />

      {cargando ? (
        <p className="cargando">Cargando tareas...</p>
      ) : tareas.length === 0 ? (
        <p className="vacio">No hay tareas aún. ¡Agrega una!</p>
      ) : (
        <div className="task-list">
          {tareas.map((tarea) => (
            <TaskItem
              key={tarea._id}
              tarea={tarea}
              onEliminar={handleEliminar}
              onEditar={setTareaEditar}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
