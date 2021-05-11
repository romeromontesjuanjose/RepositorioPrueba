"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabs = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const trabajadorSchema = new mongoose_1.Schema({
    dni: String,
    nombre: String,
    apellido: String,
    tel_contacto: String,
    salario_hora: Number,
    salario_estimado: Number,
});
// La colección de la BD (Plural siempre)
exports.Trabs = mongoose_1.model('trabajadores', trabajadorSchema);
