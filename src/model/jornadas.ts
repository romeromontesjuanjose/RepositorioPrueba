import {Schema, model } from 'mongoose'

// Definimos el Schema
const jornadaSchema = new Schema({
    datos:{
      dni_residente: String,
      dni_cuidador: String,
    },
    fecha: String,
    horas: Number,
})

//Definimos la interface
export interface Jor {
  datos:{
      dni_residente: string,
      dni_cuidador: string,
    },
  fecha: Date,
  horas: number,
}

// La colección de la BD (Plural siempre)
export const Jors = model('jornadas', jornadaSchema)