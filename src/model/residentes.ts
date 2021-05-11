import {Schema, model } from 'mongoose'

// Definimos el Schema
const residenteSchema = new Schema({
    dni: String,
    nombre: String,
    tel_emer:[String],
    apellido:String,
    pago_mes:Number,
})

//Definimos la interface
export interface Resi {
    dni: string,
    nombre: string,
    apellido: string,
    tel_emer:[string],
    pago_mes: number
}

// La colección de la BD (Plural siempre)
export const Resis = model('residentes', residenteSchema)