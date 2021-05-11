"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jors = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const jornadaSchema = new mongoose_1.Schema({
    datos: {
        dni_residente: String,
        dni_cuidador: String,
    },
    fecha: String,
    horas: Number,
});
// La colección de la BD (Plural siempre)
exports.Jors = mongoose_1.model('jornadas', jornadaSchema);
