import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarDB from './config/db'
import authRoutes from './routes/authRoutes'
import usuariosRoutes from './routes/usuariosRoutes'
import propiedadesRoutes from './routes/propiedadesRoutes'
import zonasRoutes from './routes/zonasRoutes'

dotenv.config()

conectarDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/propiedades', propiedadesRoutes)
app.use('/api/zonas', zonasRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en escuha, corriendo en puerto ${PORT}`)
})

export default app;