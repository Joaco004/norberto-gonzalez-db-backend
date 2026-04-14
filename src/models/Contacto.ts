import mongoose, { Document, Schema, SchemaType } from "mongoose";

export interface IContacto extends Document {
    propiedad: mongoose.Types.ObjectId
    nombre: string
    email: string
    telefono?: string
    mensaje: string
    estado: 'pendiente' | 'respondido' | 'descartado'
    leido: boolean
}

const ContactoSchema = new Schema(
    {
        propiedad: {
            type: Schema.Types.ObjectId,
            ref: 'Propiedad',
            required: true,
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        telefono: {
            type: String,
            trim: true,
        },
        mensaje: {
            type: String,
            required: true,
            trim: true,
        },
        estado: {
            type: String,
            enum: ['pendiente', 'respondido', 'descartado'],
            default: 'pendiente',
        },
        leido: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const Contacto = mongoose.model<IContacto>('Contacto', ContactoSchema)

export default Contacto
