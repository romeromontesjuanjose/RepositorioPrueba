export interface ResiJor {
  _id: string,
  dni: string,
  nombre: string,
  apellido: string,
  tel_emergencia: [number],
  pago_mes: number,
  enlaceJ:{
    _id: string,
    datos_jornada:{
      dni_residente: string,
      dni_cuidador: string
    },
    fecha: Date,
    horas:11
  }
}