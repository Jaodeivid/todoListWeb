import { AuthProvider, useAuth } from './context/AuthContext'
import TaskList from './components/TaskList'
import FileManager from './components/FileManager'
import Login from './components/Login'
import './App.css'

function Contenido() {
  const { usuario, logout } = useAuth()
  if (!usuario) return <Login />
  return (
    <div className="App">
      <div className="app-header">
        <span>Hola, {usuario.nombre}</span>
        <button className="btn-cancelar" onClick={logout}>Cerrar sesión</button>
      </div>
      <TaskList token={usuario.token} />
      <FileManager token={usuario.token} />
    </div>
  )
}


function App() {
  return (
    <AuthProvider>
      <Contenido />
    </AuthProvider>
  )
}

export default App
