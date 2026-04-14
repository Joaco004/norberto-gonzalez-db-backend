import mongoose, { Document, Schema } from 'mongoose'

export interface IZona extends Document {
  nombre: string
  partido: string
  provincia: string
  latitud?: number
  longitud?: number
}

const ZonaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    partido: {
      type: String,
      required: true,
      trim: true,
    },
    provincia: {
      type: String,
      required: true,
      trim: true,
      default: 'Buenos Aires',
    },
    latitud: { type: Number },
    longitud: { type: Number },
  },
  {
    timestamps: true,
  }
)

const Zona = mongoose.model<IZona>('Zona', ZonaSchema)

export default Zona;