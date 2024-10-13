// usaremos express.json, ya esta importado en el archivo server.js
const e = require("express");
const fs = require("fs"); // Importamos el modulo fs para poder trabajar con archivos
const XLSX = require('xlsx'); // Importamos la libreria xlsx para poder leer archivos excel

// ----> Profesor <----
// Variable temporal para almacenar los datos de los profesores
const profesores = [];

exports.saludo = (req, res) => {
    res.send("Admin Controller ejecutando correctamente");
};
// Verificar si no afecta que si le das más de 1 vez se suben los datos de nuevo y permanecen los anterires
exports.upload = (req, res) => {
    // Verificamos si se ha subido un archivo
    if (!req.file) {
        return res.status(400).send({ message: "No se ha subido un archivo" });
    }

    fs.readFile(req.file.path, "utf8", (err, data) => {
        if (err) {
            return res
                .status(500)
                .send({ message: "Error al leer el archivo" });
        }
        try {
            const jsonData = JSON.parse(data);
            jsonData.forEach((profesor) => {
                // Verificar si el profesor ya existe
                const existe = profesores.some((p) => p.codigo === profesor.codigo);

                // Si no existe, lo agregamos
                if (!existe) {
                    profesores.push(profesor);
                } else {
                    // Si existe, actualizamos los datos
                    const profesorIndex = profesores.findIndex(
                        (p) => p.codigo === profesor.codigo
                    );
                    profesores[profesorIndex] = profesor;
                }
                
            });
            //console.log(profesores);
            // Eliminar el archivo
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ message: "Error al eliminar el archivo" });
                }
            });
            return res.send({ message: "Archivo procesado correctamente" });
        } catch (error) {
            return res
                .status(400)
                .send({ message: "Error al procesar el archivo" });
        }
    });
};

exports.update = (req, res) => {
    // Obtenemos los datos del body y los parametros
    const { nombre, correo, contrasenia } = req.body;
    const codigo = req.params.codigo;

    // Buscamos el profesor por el codigo
    const profesorIndex = profesores.findIndex(
        (profesor) => profesor.codigo === codigo
    );

    // Verificamos si el profesor existe
    if (profesorIndex === -1){
        return res.status(404).send({ message: "Profesor no encontrado" });
    }
    // Actualizamos los datos del profesor
    profesores[profesorIndex].nombre = nombre;
    profesores[profesorIndex].correo = correo;
    profesores[profesorIndex].contrasenia = contrasenia;

    //console.log(profesores);
    return res.send({ message: "Profesor actualizado correctamente" });
};
exports.delete = (req, res) => {
    // Obtenemos el codigo del profesor
    const codigo = req.params.codigo;

    // Buscamos el profesor por el codigo
    const profesorIndex = profesores.findIndex((profesor) => profesor.codigo === codigo);

    // Verificamos si el profesor existe
    if (profesorIndex === -1) {
        return res.status(404).send({ message: "Profesor no encontrado" });
    }

    // Eliminamos el profesor
    profesores.splice(profesorIndex, 1);

    //console.log(profesores);
    return res.send({ message: "Profesor eliminado correctamente" });
};

exports.download = (req, res) => {
    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new();

    // Crear una hoja de Calculo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(profesores);

    // Agregar la hoja de calculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profesores");

    // Generar el archivo Excel en un buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Configurar los headers de la respuesta
    res.setHeader("Content-Disposition", "attachment; filename=profesores.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    
    // Enviar el archivo Excel como respuesta
    res.send(excelBuffer);
};

// Para poder obtener los profesores primero se debe subir un archivo con la informacion de los profesores (upload), no queremos que los datos persistan en la base de datos, por lo que los almacenamos en una variable temporal (profesores) y los retornamos en el endpoint obtenerprofesores.
exports.obtenerprofesores = (req, res) => {
    res.send(profesores);
};

// ----> Estudiante <----

// Variable temporal para almacenar los datos de los estudiantes
const estudiantes = [];

exports.students = (req, res) => {
    // Verificamos si se ha subido un archivo
    if (!req.file) {
        return res.status(400).send({ message: "No se ha subido un archivo" });
    }

    fs.readFile(req.file.path, "utf8", (err, data) => {
        if (err) {
            return res
                .status(500)
                .send({ message: "Error al leer el archivo" });
        }
        try {
            const jsonData = JSON.parse(data);
            jsonData.forEach((students) => {
                // Verificar si el estudiante ya existe
                const existe = estudiantes.some((e) => e.carnet === students.carnet);

                // Si no existe, lo agregamos
                if (!existe) {
                    estudiantes.push(students);
                } else {
                    // Si existe, actualizamos los datos
                    const estudianteIndex = estudiantes.findIndex(
                        (e) => e.carnet === students.carnet
                    );
                    estudiantes[estudianteIndex] = students;
                }
            });
            //console.log(profesores);
            // Eliminar el archivo
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ message: "Error al eliminar el archivo" });
                }
            });
            return res.send({ message: "Archivo procesado correctamente" });
        } catch (error) {
            return res
                .status(400)
                .send({ message: "Error al procesar el archivo" });
        }
    });
};

exports.updatestudents = (req, res) => {
    // Obtenemos los datos del body y los parametros
    const { nombre, correo, contrasenia } = req.body;
    const carnet = req.params.carnet;

    // Buscamos el estudiante por el carnet
    const estudianteIndex = estudiantes.findIndex((estudiante) => estudiante.carnet === carnet);

    // Verificamos si el estudiante existe
    if (estudianteIndex === -1){
        return res.status(404).send({ message: "Estudiante no encontrado" });
    }
    // Actualizamos los datos del estudiante
    estudiantes[estudianteIndex].nombre = nombre;
    estudiantes[estudianteIndex].correo = correo;
    estudiantes[estudianteIndex].contrasenia = contrasenia;

    return res.send({ message: "Estudiante actualizado correctamente" });
};

exports.deletestudents = (req, res) => {
    // Obtenemos el carnet del estudiante
    const carnet = req.params.carnet;

    // Buscamos el estudiante por el carnet
    const estudianteIndex = estudiantes.findIndex((estudiante) => estudiante.carnet === carnet);

    // Verificamos si el estudiante existe
    if (estudianteIndex === -1) {
        return res.status(404).send({ message: "Estudiante no encontrado" });
    }

    // Eliminamos el estudiante
    estudiantes.splice(estudianteIndex, 1);

    return res.send({ message: "Estudiante eliminado correctamente" });
};

exports.downloadstudents = (req, res) => {
    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new();

    // Crear una hoja de Calculo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(estudiantes);

    // Agregar la hoja de calculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");

    // Generar el archivo Excel en un buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Configurar los headers de la respuesta
    res.setHeader("Content-Disposition", "attachment; filename=estudiantes.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    
    // Enviar el archivo Excel como respuesta
    res.send(excelBuffer);
};

exports.obtenerestudiantes = (req, res) => {
    res.send(estudiantes);
};