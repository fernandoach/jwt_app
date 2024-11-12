import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cors from 'cors'

dotenv.config()

const users = [
  {
    id: 1,
    nombre: 'Miguel',
    usuario: 'miguel',
    passwd: '1234'
  },
  {
    id: 2,
    nombre: 'Aliaga',
    usuario: 'aliaga',
    passwd: '1234'
  }
]

const app = express()

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
  const { usuario, passwd } = req.body
  const user = users.find(o => o.usuario === usuario &&
    o.passwd === passwd)
  if (user) {
    const token = jwt.sign({ id: user.id, usuario: user.usuario },
      process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.json({ token })
  }
  return res.status(401).json('Usuario y/o contraseña incorrectos')
})

app.get('/protected', (req, res) => {
  // protected
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(400).json('Sin autorización')
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json('Token invalido')
    }

    return res.json({ message: 'Acceso autorizado', user: decoded })
  })
})

app.listen(3000, () => {
  console.log('server on => http://localhost:3000')
})
