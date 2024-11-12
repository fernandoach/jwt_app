import { Link, Route, Routes } from "react-router-dom"
import { Login } from "./login"
import { Protected } from "./protected"

function Options() {
  return (
    <div>
        <div>
          <Link to={'/'}>Inicio</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/protected'}>Protected</Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<Protected />} />
          <Route exact path="/" element={<h1>Bienvenido</h1>} />
        </Routes>
    </div>
  )
}

export { Options }