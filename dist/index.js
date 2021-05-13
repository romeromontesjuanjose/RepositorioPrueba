"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trabajadores_1 = require("./model/trabajadores");
const residentes_1 = require("./model/residentes");
const database_1 = require("./database/database");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const fun0 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.conectarBD();
    res.send("Este proyecto esta siendo accedido desde heroku y representa a una residencia de mayores, para más información de como navegar por la página consulte el documento README");
    database_1.db.desconectarBD();
});
const fun2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resi;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield residentes_1.Resis.find();
        console.log(query);
        res.send(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun2tel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(mensaje);
        const query = yield residentes_1.Resis.aggregate([
            {
                $match: { $expr: { $ne: [{ $arrayElemAt: ["$tel_emergencia", 1] }, null] } }
            }
        ]);
        res.json(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun2nom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nom = req.params.nombre;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield residentes_1.Resis.find({ "nombre": { $eq: nom } });
        console.log(query);
        res.send(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun2ape = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ape = req.params.apellido;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield residentes_1.Resis.find({ "apellido": { $eq: ape } });
        console.log(query);
        res.send(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun2dni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dni = req.params.dni;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield residentes_1.Resis.find({ "dni": { $eq: dni } });
        console.log(query);
        res.send(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let trab;
    const nom = req.params.nombre;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        let trabajadores;
        let salario_hora = 1;
        let salario_estimado = 1;
        let horas = 0;
        const query = yield trabajadores_1.Trabs.find({ "nombre": { $eq: nom } }, { _id: 0, dni: 1, nombre: 1, apellido: 1, tel_contacto: 1, salario_hora: 1, salario_estimado: 1 });
        trabajadores = query;
        console.log(trabajadores);
        for (trab of trabajadores) {
            salario_hora = trab.salario_hora;
            salario_estimado = trab.salario_estimado;
            horas = salario_estimado / salario_hora;
            res.json(`Las horas que tendría que trabajar esta semana ${nom} serían ${horas} horas`);
        }
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun4 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let residente;
    let resultado;
    const dni = req.params.dni;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        let num_cuidados = 0;
        console.log(mensaje);
        const query = yield residentes_1.Resis.aggregate([
            {
                $lookup: {
                    from: "jornadas",
                    localField: "dni",
                    foreignField: "datos_jornada.dni_residente",
                    as: "enlaceJ"
                }
            },
            {
                $unwind: "$enlaceJ"
            },
            {
                $match: { "enlaceJ.datos_jornada.dni_residente": dni }
            }
        ]);
        resultado = query;
        console.log(query);
        for (residente of resultado) {
            console.log();
            num_cuidados += 1;
        }
        res.json(`El residente con el dni ${dni} ha recibido cuidados un total de ${num_cuidados} veces.`);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
app.get('/', fun0); // Pantalla principal
app.get('/residentes', fun2); // Muestra a todos los residentes
app.get('/residentes/tel_movil', fun2tel); //Muestra a todos los residentes que poseen un teléfono móvil
app.get('/residentes/nombre/:nombre', fun2nom); // Buscar a un residente en función de su nombre
app.get('/residentes/apellido/:apellido', fun2ape); // Buscar a un residente en función de su apellido
app.get('/residentes/dni/:dni', fun2dni); // Buscar a un residente en función de su dni
app.get('/trabajador/dias/:nombre', fun3); // Muestra las horas que tienen que trabajar los trabajadores esta semana como mínimo para alcanzar su salario estimado
app.get('/residentes/veces_atendido/:dni', fun4); // Muestra cuantas veces se ha porporcionado un servicio exahustivo a un residente (buscado por dni) esta semana
app.listen(process.env.PORT || port, () => {
    console.log(`Listening...`);
});
