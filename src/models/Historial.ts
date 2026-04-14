import mongoose, { Document, Schema } from 'mongoose'

export interface IHistorial extends Document {
  vendedor: mongoose.Types.ObjectId
  accion: 'nueva_propiedad' | 'edicion' | 'eliminacion'
  propiedad: mongoose.Types.ObjectId
  detalle: string
  fecha: Date
}

const HistorialSchema = new Schema(
  {
    vendedor: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    accion: {
      type: String,
      required: true,
      enum: ['nueva_propiedad', 'edicion', 'eliminacion'],
    },
    propiedad: {
      type: Schema.Types.ObjectId,
      ref: 'Propiedad',
      required: true,
    },
    detalle: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const Historial = mongoose.model<IHistorial>('Historial', HistorialSchema)

export default Historial