const nuevo = async (funcion, nombre, rut, curso, nivel, client) => {

    // Agregar un nuevo estudiante.(node index.js funcion 'Adrian Pérez' '12.843.876-9' 'piano' 6)
    // console.log(error_conexion)
    async function ingresar() {
        const SQLQuery = {
            name: 'insertarEstudiante',
            text: 'insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;', //agregarle comillas simples al INT
            values: [nombre, rut, curso, nivel],
        }
        try {
            client.query(SQLQuery),
                    console.log("Registro de ${nombre} agregado con éxito: ", resul.rows[0]);
        } catch (error_query){
    console.log(error_query);
            }
    }


    // Consultar los estudiantes registrados.
    async function consulta() {
        const SQLQuery = {
            rowMode: "array",
            name: 'sql-user', // prepared statement
            text:
                "SELECT * FROM estudiantes",
        };
        try {
            const res = await client.query(SQLQuery);
            // release();
            console.log("Ultimo registro agregado: ", res.rows);
        } catch (error) { console.log(error.code); }
        // pool.end();
    }


    //  Consultar estudiante por rut (node index.js funcion nombre 12.543.876-9)
    async function consultaRut() {
        const SQLQuery = {
            rowMode: "array",
            name: 'sql-user', // prepared statement
            text:
                `SELECT * FROM estudiantes where rut = $1`,
            values: [rut]
        };
        try {
            const res = await client.query(SQLQuery);
            release();
            console.log("Ultimo registro agregado: ", res.rows);
        } catch (error) { console.log(error.code); }
        // pool.end();
    }


    //  Actualizar la información de un estudiante ej:nivel(node index.js funcion nombre 12.456.786-8 curso 6).
    async function actualizar() {
        const SQLQuery = {
            rowMode: "array",
            name: 'sql-user', // prepared statement
            text:
                `UPDATE estudiantes SET nivel = $2 WHERE rut = $1 RETURNING*; `,
            values: [rut, nivel]
        };
        try {
            const res = await client.query(SQLQuery);
            // release();
            console.log("Actualización realizada con éxito: ", res.rows);
        } catch (error) { console.log(error.code); }
    }


    // Eliminar el registro de un estudiante(node index.js funcion nombre 12.543.876-9)
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
    }
}

    module.exports = {
        ingresar,
        consulta,
        consultaRut,
        actualizar,
        eliminar,
    }