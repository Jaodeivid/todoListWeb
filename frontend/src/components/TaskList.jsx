import { useState, useEffect } from 'react'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import { getTasks, crearTask, actualizarTask, eliminarTask } from '../services/taskService'

function TaskList() {
  const [tareas, setTareas] = useState([])
  const [tareaEditar, setTareaEditar] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarTareas()
  }, [])

  const cargarTareas = async () => {
    setCargando(true)
    const data = await getTasks()
    setTareas(data)
    setCargando(false)
  }

  const handleGuardar = async (datos) => {
    if (tareaEditar) {
      await actualizarTask(tareaEditar._id, datos)
      setTareaEditar(null)
    } else {
      await crearTask(datos)
    }
    cargarTareas()
  }

  const handleEliminar = async (id) => {
    await eliminarTask(id)
    cargarTareas()
  }

  const handleToggle = async (id, completadaActual) => {
    await actualizarTask(id, { completada: !completadaActual })
    cargarTareas()
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
