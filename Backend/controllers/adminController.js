// usaremos express.json, ya esta importado en el archivo server.js
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

// ----> Curso <----

// Variable temporal para almacenar los datos de los cursos
const cursos = [];

// recuerda: Por defecto todos contendrán 0 alumnos.
// Pero a medida que se vayan inscribiendo alumnos, se deberá actualizar el valor de la propiedad alumnos.
// Esta cantidad se aumentara en la funcion incrementarAlumnos (ya no esta en teacherController.js, ahora esta en adminController.js)
exports.courses = (req, res) => {
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
            jsonData.forEach((course) => {
                // Verificar si el estudiante ya existe
                const existe = cursos.some((e) => e.codigo === course.codigo);

                // Si no existe, lo agregamos
                if (!existe) {
                    //cursos.push(course);
                    cursos.push({
                        ...course,
                        alumnos: 0
                    });
                } else {
                    // Si existe, actualizamos los datos
                    const cursoindex = cursos.findIndex(
                        (e) => e.codigo === course.codigo
                    );
                    //cursos[cursoindex] = course;
                    // Mantener los datos del curso
                    const alumnoActual = cursos[cursoindex].alumnos;

                    // Actualizar los datos del curso
                    cursos[cursoindex] = {
                        ...course,
                        alumnos: alumnoActual
                    };
                }
            });
            //console.log(cursos);
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

exports.updatecourses = (req, res) => {
    // Obtenemos los datos del body y los parametros
    const { nombre, creditos, profesor } = req.body;
    const codigo = parseInt(req.params.codigo);

    // Buscamos el curso por el codigo
    const cursoindex = cursos.findIndex((curso) => curso.codigo === codigo);

    // Verificamos si el curso existe
    if (cursoindex === -1){
        return res.status(404).send({ message: "Curso no encontrado" });
    }
    // Actualizamos los datos del curso
    cursos[cursoindex].nombre = nombre;
    cursos[cursoindex].creditos = creditos;
    cursos[cursoindex].profesor = profesor;

    return res.send({ message: "Curso actualizado correctamente" });
};

exports.deletecourses = (req, res) => {
    // Obtenemos el codigo del curso
    const codigo = parseInt(req.params.codigo);

    // Buscamos el curso por el codigo
    const cursoindex = cursos.findIndex((curso) => curso.codigo === codigo);

    // Verificamos si el curso existe
    if (cursoindex === -1) {
        return res.status(404).send({ message: "Curso no encontrado" });
    }

    // Eliminamos el curso
    cursos.splice(cursoindex, 1);

    return res.send({ message: "Curso eliminado correctamente" });
};

exports.downloadcourses = (req, res) => {
    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new();

    // Crear una hoja de Calculo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(cursos);

    // Agregar la hoja de calculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cursos");

    // Generar el archivo Excel en un buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Configurar los headers de la respuesta
    res.setHeader("Content-Disposition", "attachment; filename=cursos.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    
    // Enviar el archivo Excel como respuesta
    res.send(excelBuffer);
};

exports.obtenercursos = (req, res) => {
    res.send(cursos);
};

// Funcion para incrementar el numero de alumnos en un curso
// esta funcion la colocaremos junto cuando hagamos la peticion de carga alumnos
// Esta funcion toma en cuenta que cada profesor tiene un codigo de curso que no se repite entre los profesores
// function incrementarAlumnos(codigoCurso, codigoProfesor,cantidad)  {
//     // Buscamos el curso en el array 'cursos'
//     const curso = cursos.find((curso) => curso.codigo === codigoCurso && curso.profesor === codigoProfesor);

//     // Verificamos si el curso existe
//     if (!curso) {
//         return res.status(404).send({ message: "Curso no encontrado" });
//     }

//     // Incrementamos el numero de alumnos
//     curso.alumnos += cantidad;

//     // Enviamos la respuesta
//     console.log("Numero de alumnos incrementado correctamente");
// };

// Exportamos las funciones
exports.cursos = cursos; // Exportamos la variable cursos
exports.estudiantes = estudiantes; // Exportamos la variable estudiantes
exports.profesores = profesores; // Exportamos la variable profesores
//exports.incrementarAlumnos = incrementarAlumnos; // Exportamos la funcion incrementarAlumnos