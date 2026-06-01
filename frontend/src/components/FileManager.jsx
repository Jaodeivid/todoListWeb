import { useState, useEffect, useRef } from 'react'
import { listarArchivos, subirArchivo, bajarArchivo, eliminarArchivo } from '../services/fileService'

function FileManager() {
  const [archivos, setArchivos] = useState([])
  const [archivo, setArchivo] = useState(null)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => { cargarArchivos() }, [])

  const cargarArchivos = async () => {
    try {
      const data = await listarArchivos()
      setArchivos(data.archivos ?? [])
    } catch {
      setArchivos([])
    }
  }

  const handleSubir = async () => {
    if (!archivo) return
    setError('')
    try {
      await subirArchivo(archivo)
      setArchivos(prev => prev.includes(archivo.name) ? prev : [...prev, archivo.name])
      setArchivo(null)
      if (inputRef.current) inputRef.current.value = ''
    } catch {
      setError('No se pudo subir el archivo, intenta de nuevo.')
    }
  }

  const handleSeleccionar = (e) => {
    setArchivo(e.target.files[0])
    setError('')
  }

  const handleDescargar = async (nombre) => {
    try { await bajarArchivo(nombre) }
    catch { setError('No se pudo descargar el archivo.') }
  }

  const handleEliminar = async (nombre) => {
    setArchivos(prev => prev.filter(a => a !== nombre))
    try {
      await eliminarArchivo(nombre)
    } catch {
      setError('No se pudo eliminar el archivo.')
      cargarArchivos()
    }
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Gestión de Archivos</h2>

      <div style={{ marginTop: 12 }}>
        <input
          ref={inputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleSeleccionar}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <button onClick={() => inputRef.current.click()}>Seleccionar archivo</button>
            {archivo && <p style={{ fontSize: 13, margin: '4px 0 0 0' }}>{archivo.name}</p>}
          </div>
          <button onClick={handleSubir} disabled={!archivo}>Subir archivo</button>
        </div>
      </div>

      {error && <p style={{ marginTop: 8, fontSize: 13, color: 'red' }}>{error}</p>}

      <h3 style={{ marginTop: 24 }}>Archivos en el servidor</h3>

      {archivos.length === 0 ? (
        <p style={{ fontSize: 13, color: '#666' }}>No hay archivos aún.</p>
      ) : (
        <table style={{ marginTop: 8, borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #000', textAlign: 'left' }}>
              <th style={{ padding: '6px 0' }}>Nombre</th>
              <th style={{ padding: '6px 0', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {archivos.map((nombre) => (
              <tr key={nombre} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '7px 0', wordBreak: 'break-word', maxWidth: 260 }}>
                  {nombre}
                </td>
                <td style={{ padding: '7px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button onClick={() => handleDescargar(nombre)}>Descargar</button>
                  {' '}
                  <button onClick={() => handleEliminar(nombre)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FileManager