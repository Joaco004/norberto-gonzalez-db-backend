import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarDB from './config/db'

dotenv.config()

conectarDB()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en escuha, corriendo en puerto ${PORT}`)
})

export default app;