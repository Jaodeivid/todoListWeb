const BASE = '/archivos'

export const listarArchivos = async (token) => {
  const res = await fetch(BASE, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}

export const subirArchivo = async (token, archivo) => {
  const formData = new FormData()
  formData.append('archivo', archivo)
  const res = await fetch(`${BASE}/subir`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
  return res.json()
}

export const bajarArchivo = async (token, nombre) => {
  const res = await fetch(`${BASE}/bajar/${nombre}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Archivo no encontrado')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nombre
  link.click()
  URL.revokeObjectURL(url)
}

export const eliminarArchivo = async (token, nombre) => {
  const res = await fetch(`${BASE}/${nombre}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}
