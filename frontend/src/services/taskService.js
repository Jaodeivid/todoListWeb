const BASE = '/tareas'

export const getTasks = async () => {
  const res = await fetch(BASE)
  return res.json()
}

export const crearTask = async (data) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const actualizarTask = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const eliminarTask = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  return res.json()
}
