import { useState, useEffect } from 'react'

function TaskForm({ onGuardar, tareaEditar, onCancelar }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    if (tareaEditar) {
      setTitulo(tareaEditar.titulo)
      setDescripcion(tareaEditar.descripcion)
    } else {
      setTitulo('')
      setDescripcion('')
    }
  }, [tareaEditar])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!titulo.trim()) return
    onGuardar({ titulo, descripcion })
    setTitulo('')
    setDescripcion('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Título de la tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">{tareaEditar ? 'Actualizar' : 'Agregar tarea'}</button>
        {tareaEditar && (
          <button type="button" className="btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
