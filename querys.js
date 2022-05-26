const { Pool } = require("pg");

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

// Agregar un nuevo estudiante.(node index.js funcion 'Adrian Pérez' '12.843.876-9' 'piano' 6)

pool.connect((error_conexion, client, release) => {
    console.log(error_conexion)
    async function ingresar (){
    const SQLQuery = {
        name: 'insertarEstudiante',
        text: 'insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;', //agregarle comillas simples al INT
        values: [nombre, rut, curso, nivel],
    }
    client.query(
        SQLQuery,
        (error_query, resul) => {
            console.log(error_query);
            release();
            console.log("Registro agregado con éxito: ", resul.rows[0]);
        });
        pool.end();
    }
});

// Consultar los estudiantes registrados.
pool.connect(async (error_conexion, client, release) => {
     async function consulta() {
    const SQLQuery = {
        rowMode: "array",
         name: 'sql-user', // prepared statement
        text:
            "SELECT * FROM estudiantes",
    };
    const res = await client.query(SQLQuery);
    release();
    console.log("Ultimo registro agregado: ", res.rows);
    pool.end();
}
});


//  Consultar estudiante por rut (node index.js funcion nombre 12.543.876-9)
pool.connect(async (error_conexion, client, release) => {
async function consultaRut() {
    const SQLQuery = {
        rowMode: "array",
         name: 'sql-user', // prepared statement
        text:
            `SELECT * FROM estudiantes where rut = $1`,
        values:[rut]
    };
    const res = await client.query(SQLQuery);
    release();
    console.log("Ultimo registro agregado: ", res.rows);
    pool.end();
}
});

//  Actualizar la información de un estudiante ej:nivel(node index.js funcion nombre 12.456.786-8 curso 6).
pool.connect(async (error_conexion, client, release) => {
    async function actualizar() {
        const SQLQuery = {
            rowMode: "array",
            name: 'sql-user', // prepared statement
            text:
                `UPDATE estudiantes SET nivel = $2 WHERE rut = $1 RETURNING*; `,
            values: [rut, nivel]
        };
        const res = await client.query(SQLQuery);
        release();
        console.log("Actualización realizada con éxito: ", res.rows);
        pool.end();
    }
});

// Eliminar el registro de un estudiante(node index.js funcion nombre 12.543.876-9)

pool.connect(async (error_conexion, client, release) => {
    async function eliminar() {
        const SQLQuery = {
            rowMode: "array",
            name: 'sql-user', // prepared statement
            text:
                `DELETE FROM estudiantes WHERE rut = $1 RETURNING*; `,
            values: [rut]
        };
        try {
            const res = await client.query(SQLQuery);
        } catch (error) { console.log(error.code); }
        console.log("Registro eliminado con éxito: ", res.rows);

        release();

        pool.end();
    }
});

