import mongoose from 'mongoose'

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('MongoDB conectado')
  } catch (error) {
    console.error('Error conectando a MongoDB:', error)
    process.exit(1)
  }
}

export default conectarDB;