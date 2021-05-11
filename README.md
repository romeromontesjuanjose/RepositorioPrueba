*Hecho por Juan José Romero Montes*

## Explicación

La base de datos consiste en tres colecciones la primera colección es `clientes`, la segunda `trabajadores` y la tercera `jornadas`. Se entra en más detalle sobre ella en la documentación.

## Como navegar por la página

* /residentes = Muestra a todos los residentes
* /residente/tel_movil = Muestra a todos los residentes que poseen un teléfono móvil
* /residente/nombre/:nombre = Buscar a un residente en función de un nombre introducido
* /residente/apellido/:apellido = Buscar a un residente en función de un apellido introducido
* /residente/apellido/:dni = Buscar a un residente en función de un dni introducido
* /trabajador/dias/:nombre = Muestra las horas que tienen que trabajar los trabajadores esta semana como mínimo para alcanzar su salario estimado
* /residente/veces_atendido/:dni = Muestra cuantas veces se ha prorporcionado un servicio exhaustivo a un residente (buscado por dni) esta semana