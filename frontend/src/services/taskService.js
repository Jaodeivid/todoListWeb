const BASE = '/tareas'

export const getTasks = async (token) => {
  const res = await fetch(BASE, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return res.json()
}

export const crearTask = async (token,data) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const actualizarTask = async (token,id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const eliminarTask = async (token, id) => {
  const res = await fetch(`${BASE}/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return res.json()
}
