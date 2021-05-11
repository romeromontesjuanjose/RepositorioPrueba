"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resis = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const residenteSchema = new mongoose_1.Schema({
    dni: String,
    nombre: String,
    tel_emer: [String],
    apellido: String,
    pago_mes: Number,
});
// La colección de la BD (Plural siempre)
exports.Resis = mongoose_1.model('residentes', residenteSchema);
