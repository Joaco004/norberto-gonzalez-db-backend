import mongoose, { Document, Schema } from "mongoose";

interface IFoto {
    _id?: string
    url: string
    urlThumbnail: string
    orden: number
    principal: boolean
}

interface ICaracteristicas {
    nombre: string
    categoria: string
}

export interface IPropiedad extends Document {
    ficha?: number
    titulo: string
    description: string
    tipo: 'casa' | 'departamento' | 'local' | 'terreno' | 'oficina' | 'cochera'
    subtipo?: string
    operacion: 'venta' | 'alquiler' | 'alquiler-temporal'
    precio: number
    moneda: 'USD' | 'ARS'
    ambientes: number
    dormitorios: number
    banos: number
    superficieTotal: number
    superficieCubierta: number
    cochera: boolean
    antiguedad: number
    estado: 'disponible' | 'reservado' | 'vendido' | 'alquilado'
    destacada: boolean
    publicada: boolean
    zona: mongoose.Types.ObjectId
    vendedor: mongoose.Types.ObjectId
    fotos: IFoto[]
    caracteristicas: ICaracteristicas[]
    calle?: string
    latitud?: number
    longitud?: number
}

const FotoSchema = new Schema<IFoto>({
    url: { type: String, required: true },
    urlThumbnail: { type: String },
    orden: { type: Number, default: 0 },
    principal: { type: Boolean, default: false },
})

const PropiedadSchema = new Schema(
    {
        ficha: { type: Number, unique: true, sparse: true },
        titulo: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        tipo: {
            type: String,
            required: true,
            enum: ['casa', 'departamento', 'local', 'terreno', 'oficina', 'cochera'],
        },
        subtipo: { type: String, trim: true },
        operacion: {
            type: String,
            required: true,
            enum: ['venta', 'alquiler', 'alquiler-temporal'],
        },
        precio: { type: Number, required: true },
        moneda: { type: String, enum: ['USD', 'ARS'], default: 'USD' },
        ambientes: { type: Number },
        dormitorios: { type: Number },
        banos: { type: Number },
        superficieTotal: { type: Number },
        superficieCubierta: { type: Number },
        cochera: { type: Boolean, default: false },
        antiguedad: { type: Number },
        estado: {
            type: String,
            enum: ['disponible', 'reservado', 'vendido', 'alquilado'],
            default: 'disponible',
        },
        destacada: { type: Boolean, default: false },
        publicada: { type: Boolean, default: false },
        zona: { type: Schema.Types.ObjectId, ref: 'Zona', required: true },
        vendedor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
        fotos: [FotoSchema],
        caracteristicas: [
            {
                nombre: { type: String },
                categoria: { type: String },
            },
        ],
        calle: { type: String, trim: true },
        latitud: { type: Number },
        longitud: { type: Number },
    },
    {
        timestamps: true,
    }
)

const Propiedad = mongoose.model<IPropiedad>('Propiedad', PropiedadSchema)

export default Propiedad;