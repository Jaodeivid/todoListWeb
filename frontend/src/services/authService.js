const BASE = '/auth'

export const loginService = async (email, password) => {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error((await res.json()).mensaje)
  return res.json()
}

export const registroService = async (nombre, email, password) => {
  const res = await fetch(`${BASE}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  })
  if (!res.ok) throw new Error((await res.json()).mensaje)
  return res.json()
}
