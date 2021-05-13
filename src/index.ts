import { Trab, Trabs } from './model/trabajadores'
import { Resi, Resis } from './model/residentes'
import { Jor, Jors } from './model/jornadas'
import { ResiJor } from './model/interfaces'
import { db } from './database/database'
import {Request, Response} from 'express'
import express from 'express'
const app = express()
const port = 3000

const fun0 = async (req: Request, res: Response) => {
  await db.conectarBD()
   res.send("Este proyecto esta siendo accedido desde heroku y representa a una residencia de mayores, para más información de como navegar por la página consulte el documento README")
  db.desconectarBD()
}

const fun2 = async (req: Request, res: Response) => {
  let resi: Resi
  await db.conectarBD()
  .then(
    async (mensaje) => {
      const query: any = await Resis.find()
      console.log(query)
      
      res.send(query)
    })
  .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })    
  db.desconectarBD()
}

const fun2tel = async (req: Request, res: Response) => {
  await db.conectarBD()

  .then(
    async (mensaje) => {
        console.log(mensaje)
        const query = await Resis.aggregate([
        {
          $match:{$expr:{$ne:[{ $arrayElemAt: ["$tel_emergencia", 1] },null]}}
        }
      ])
    res.json(query)
    })
.catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
  db.desconectarBD()
 }

const fun2nom = async (req: Request, res: Response) => {
  const nom = req.params.nombre
  await db.conectarBD()
  .then(
    async (mensaje) => {
      const query: any = await Resis.find({ "nombre": { $eq: nom } })
      console.log(query)
      
      res.send(query)
    })
  .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })    
  db.desconectarBD()
}

const fun2ape = async (req: Request, res: Response) => {
  const ape = req.params.apellido
  await db.conectarBD()
  .then(
    async (mensaje) => {
      const query: any = await Resis.find({ "apellido": { $eq: ape } })
      console.log(query)
      
      res.send(query)
    })
  .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })    
  db.desconectarBD()
}

const fun2dni = async (req: Request, res: Response) => {
  const dni = req.params.dni
  await db.conectarBD()
  .then(
    async (mensaje) => {
      const query: any = await Resis.find({ "dni": { $eq: dni } })
      console.log(query)
      
      res.send(query)
    })
  .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })    
  db.desconectarBD()
}

const fun3 = async (req: Request, res: Response) => {
  let trab: Trab
  const nom = req.params.nombre
  await db.conectarBD()
  
  .then(
    async (mensaje) => {
        let trabajadores: Array<Trab>
        let salario_hora: number = 1
        let salario_estimado: number = 1
        let horas: number = 0

        const query: any = await Trabs.find({"nombre":{ $eq: nom }},{_id: 0, dni: 1, nombre: 1, apellido: 1, tel_contacto: 1, salario_hora: 1, salario_estimado: 1})
        trabajadores = query
        console.log(trabajadores)

        for(trab of trabajadores){
        salario_hora = trab.salario_hora
        salario_estimado = trab.salario_estimado
        horas = salario_estimado/salario_hora

        res.json(`Las horas que tendría que trabajar esta semana ${nom} serían ${horas} horas`)
        }
    })
.catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
  db.desconectarBD()
 }

const fun4 = async (req: Request, res: Response) => {
  let residente: ResiJor
  let resultado: Array<ResiJor>
  const dni = req.params.dni
  await db.conectarBD()
  .then(
    async (mensaje) => {
      let num_cuidados: number = 0
        console.log(mensaje)
        const query: any = await Resis.aggregate([
    {
      $lookup:
      {
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
      $match:{"enlaceJ.datos_jornada.dni_residente":dni}
    }
])
resultado=query
console.log(query)
  for (residente of resultado){
    console.log()
    num_cuidados += 1
  }
    res.json(`El residente con el dni ${dni} ha recibido cuidados un total de ${num_cuidados} veces.`)
    })
  .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })    
  db.desconectarBD()
}

app.get('/', fun0) // Pantalla principal
app.get('/residentes', fun2) // Muestra a todos los residentes
app.get('/residentes/tel_movil', fun2tel) //Muestra a todos los residentes que poseen un teléfono móvil
app.get('/residentes/nombre/:nombre', fun2nom) // Buscar a un residente en función de su nombre
app.get('/residentes/apellido/:apellido', fun2ape) // Buscar a un residente en función de su apellido
app.get('/residentes/dni/:dni', fun2dni) // Buscar a un residente en función de su dni
app.get('/trabajador/dias/:nombre', fun3) // Muestra las horas que tienen que trabajar los trabajadores esta semana como mínimo para alcanzar su salario estimado
app.get('/residentes/veces_atendido/:dni', fun4) // Muestra cuantas veces se ha porporcionado un servicio exahustivo a un residente (buscado por dni) esta semana

app.listen(process.env.PORT || port, () => {
  console.log(`Listening...`)
})