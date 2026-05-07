import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarDB from './config/db'
import authRoutes from './routes/authRoutes'
import usuariosRoutes from './routes/usuariosRoutes'
import propiedadesRoutes from './routes/propiedadesRoutes'
import zonasRoutes from './routes/zonasRoutes'
import historialRoutes from './routes/historialRoutes'
import contactosRoutes from './routes/contactosRoutes'
import fotosRoutes from './routes/fotosRoutes'

dotenv.config()

conectarDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/propiedades', propiedadesRoutes)
app.use('/api/zonas', zonasRoutes)
app.use('/api/historial', historialRoutes)
app.use('/api/contactos', contactosRoutes)
app.use('/api/propiedades', fotosRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en escuha, corriendo en puerto ${PORT}`)
})

export default app;