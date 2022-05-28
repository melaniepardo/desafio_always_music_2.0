const { Pool } = require("pg");
const { ingresar, consulta, consultaRut, actualizar, eliminar } = require('./querys')
const argumentos = process.argv

const funcion = argumentos[2]
const nombre = argumentos[3]
const rut = argumentos[4]
const curso = argumentos[5]
const nivel = argumentos[6]

const config = {
    user: "postgres",
    host: "localhost",
    password: "espinoza",
    database: "alwaysmusic_db",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

pool.connect(async (error_conexion, funcion, release) => {
    if (error_conexion) {
        console.error(error_conexion.code)
    }
    else if (funcion === 'ingresar') {
        ingresar(nombre, rut, curso, nivel)
    }
    else if (funcion === 'consulta') {
        consulta()
    }
    else if (funcion === 'consultaRut') {
        consultaRut(nombre)// con (rut) no funciona por la posición de arv
    }
    else if (funcion === 'actualizar') {
        actualizar(nivel)
    }
    else if (funcion === 'eliminar') {
        eliminar(rut)
    }
    release()
    pool.end()
})