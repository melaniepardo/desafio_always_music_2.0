--Crear una base de datos con nombre
CREATE DATABASE alwaysmusic_db;

-- con \c nos vamos a la database
\c alwaysmusic_db --Crear una tabla “estudiantes”
CREATE TABLE estudiantes (
    nombre varchar(50) NOT NULL,
    rut varchar(12) NOT NULL PRIMARY KEY,
    curso varchar(20) NOT NULL,
    nivel INT NOT NULL
);