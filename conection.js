
if (funcion === 'consulta') {
    consulta()
}
else if (funcion === 'ingresar') {
    ingresar(nombre, rut, curso, nivel)
}
else if (funcion === 'consultaRut') {
    consultaRut(nombre)// con (rut) no funciona por la posición de arv
}
else if (funcion === 'estudiantesRegistrados') {
    estudiantesRegistrados()
}
else if (funcion === 'actualizar') {
    actualizar(nivel)
}
else if (funcion === 'eliminar') {
    eliminar(rut)
}