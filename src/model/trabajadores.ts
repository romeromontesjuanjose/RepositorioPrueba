import {Schema, model } from 'mongoose'

// Definimos el Schema
const trabajadorSchema = new Schema({
    dni: String,
    nombre: String,
    apellido: String,
    tel_contacto: String,
    salario_hora: Number,
    salario_estimado: Number,
})

//Definimos la interface
export interface Trab {
    dni: string,
    nombre: string,
    apellido: string,
    tel_contacto: string,
    salario_hora: number,
    salario_estimado: number,
}

// La colección de la BD (Plural siempre)
export const Trabs = model('trabajadores', trabajadorSchema)