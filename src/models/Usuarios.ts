import mongoose, { CallbackError, Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUsuario extends Document {
    id: string
    nombre: string
    email: string
    password: string
    esAdmin: boolean
    activo: boolean
    createdAt: Date
    compararPassword: (password: string) => Promise<boolean>
}

const UsuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        esAdmin: {
            type: Boolean,
            default: false,
        },
        activo: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

UsuarioSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return 
    }

    this.password = await bcrypt.hash(this.password as string, 10)
})

UsuarioSchema.methods.compararPassword = async function (password: string) {
    return bcrypt.compare(password, this.password)
}

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema)

export default Usuario;
