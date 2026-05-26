function TaskItem({ tarea, onEliminar, onEditar, onToggle }) {
  return (
    <div className={`task-item ${tarea.completada ? 'completada' : ''}`}>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onToggle(tarea._id, tarea.completada)}
      />
      <div className="task-info">
        <span className="task-titulo">{tarea.titulo}</span>
        {tarea.descripcion && (
          <span className="task-descripcion">{tarea.descripcion}</span>
        )}
      </div>
      <div className="task-acciones">
        <button className="btn-editar" onClick={() => onEditar(tarea)}>Editar</button>
        <button className="btn-eliminar" onClick={() => onEliminar(tarea._id)}>Eliminar</button>
      </div>
    </div>
  )
}

export default TaskItem
