import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { loginService, registroService } from '../services/authService'

function Login() {
  const { login } = useAuth()
  const [modo, setModo] = useState('login')
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      const datos = modo === 'login'
        ? await loginService(form.email, form.password)
        : await registroService(form.nombre, form.email, form.password)
      login(datos)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>{modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>

        <form onSubmit={handleSubmit} className="task-form">
          {modo === 'registro' && (
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          )}
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={cargando}>
            {cargando ? 'Cargando...' : modo === 'login' ? 'Entrar' : 'Registrarse'}
          </button>
        </form>

        <p className="login-toggle">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          {' '}
          <span onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); setError('') }}>
            {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
