const BASE = '/archivos'

export const listarArchivos = async () => {
  const res = await fetch(BASE)
  return res.json()
}

export const subirArchivo = async (archivo) => {
  const formData = new FormData()
  formData.append('archivo', archivo)
  const res = await fetch(`${BASE}/subir`, {
    method: 'POST',
    body: formData
  })
  return res.json()
}

export const bajarArchivo = async (nombre) => {
  const res = await fetch(`${BASE}/bajar/${nombre}`)
  if (!res.ok) throw new Error('Archivo no encontrado')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nombre
  link.click()
  URL.revokeObjectURL(url)
}

export const eliminarArchivo = async (nombre) => {
  const res = await fetch(`${BASE}/${nombre}`, { method: 'DELETE' })
  return res.json()
}
