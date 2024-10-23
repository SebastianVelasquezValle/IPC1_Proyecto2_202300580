const fs = require("fs"); // Importamos el modulo fs para poder trabajar con archivos

// importamos la funcion para incrementar los alumnos, cursos y estudiantes (este array solo nos servira para buscar el nombre del estudiantes)
const {
    cursos,
    estudiantes,
    profesores,
} = require("./adminController");
const { parse } = require("path");

exports.saludo = (req, res) => {
    res.send("Profesor Controller ejecutando correctamente");
};

// Variable temporal para almacenar las actividades
const actividades = []; // este es el array donde se guardaran las actividades y sufrira cambios
// Variable temporal para almacenar los alumnos
const alumnos = [];
const alumnosCarnet = []; // este array solo nos servira para buscar el nombre del estudiante, acá solo contendra los carnet, el array alumnos contendra todos los datos del estudiante

function incrementarAlumnos(codigoCurso, codigoProfesor,cantidad)  {
    // Buscamos el curso en el array 'cursos'
    const curso = cursos.find((curso) => parseInt(curso.codigo) === parseInt(codigoCurso) && curso.profesor === codigoProfesor);

    //console.log(cursos);
    // Verificamos si el curso existe
    if (!curso) {
        //return res.status(404).send({ message: "Curso no encontrado" });
        return console.log("Curso no encontrado");
    }
    // Incrementamos el numero de alumnos
    curso.alumnos = cantidad;

    // Enviamos la respuesta
    console.log("Numero de alumnos incrementado correctamente");
};

// Endpoint para ver los cursos que imparte el profesor
exports.obtenerCursos = (req, res) => {
    const codigo = req.params.codigo;
    // Buscamos los cursos que imparte el profesor
    const cursosProfesor = cursos.filter((curso) => curso.profesor === codigo); // Cuando se encuentre los cursos que imparte el profesor se guardaran en el nuevo array
    // este array no se modificara, solo se guardaran los cursos que imparte el profesor mostrara, pero el que se modificara sera el array cursos

    // Verificamos si el profesor no tiene cursos
    if (cursosProfesor.length === 0) {
        return res.status(404).send({ message: "No se encontraron cursos" });
    }

    // Si en un futuro deseo ver los datos sin el id del profesor es con un for each, y agregandolo a un nuevo array, de lo contrario que continue con el id del profesor

    // Retornamos los cursos
    res.status(200).send(cursosProfesor);
};

// Endpoint para cargar las actividades del profesor
exports.uploadActvidades = (req, res) => {
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
            jsonData.forEach((actividad) => {
                // Verificar si la actividad ya existe
                const existe = actividades.some(
                    (a) =>
                        a.nombre === actividad.nombre &&
                        a.profesor === actividad.profesor
                );

                // Si no existe, lo agregamos
                if (!existe) {
                    actividades.push(actividad);
                } else {
                    // Si existe, actualizamos los datos
                    const actividadIndex = actividades.findIndex(
                        (a) =>
                            a.nombre === actividad.nombre &&
                            a.profesor === actividad.profesor
                    );
                    actividades[actividadIndex] = actividad;
                }

                // Si no importa si se repiten las actividades, se puede hacer de la siguiente manera
                //actividades.push(actividad);
            });
            //console.log(actividades);
            // Verificamos si esta las notas en la actividad
            // actividades.forEach((actividad) => {
            //     if (!actividad.notas) {
            //         actividad.notas = { notae: [] };
            //     }
            //     console.log(actividad.notas);
            // });

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

// Endpoint para obtener las actividades del profesor
exports.obteneractividades = (req, res) => {
    const codigo = req.params.codigo;
    // Buscamos las actividades del profesor
    const actividadesProfesor = actividades.filter(
        (actividad) => actividad.profesor === codigo
    );

    // Para mostrar los datos necesario y no todo el array usamos for each y lo guardamos en un nuevo array
    const actividadesDatos = [];
    actividadesProfesor.forEach((actividad) => {
        let promedioActividad = 0;
        const notas = actividad.notas.map((nota) => nota.nota);
        //console.log(notas);
        promedioActividad = promedio(notas);
        //console.log(promedioActividad);

        actividadesDatos.push({
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            ponderacion: actividad.ponderacion,
            promedio: promedioActividad,
        });
    });

    // Retornamos las actividades
    //res.status(200).send(actividadesProfesor);
    res.status(200).send(actividadesDatos);
};

// otro obtener actividades, pero con un status 404 (opcional)
exports.obteneractividades_Advert = (req, res) => {
    const codigo = req.params.codigo;
    // Buscamos las actividades del profesor
    const actividadesProfesor = actividades.filter(
        (actividad) => actividad.profesor === codigo
    );

    // Verificamos si el profesor no tiene actividades
    // Pero ya que tambien este endpoint se ejecutara de una vez, le mandamos el array vacio
    if (actividadesProfesor.length === 0) {
        // Si no tiene actividades se mostrara un mensaje
        res.status(404).send({ message: "No se encontraron actividades" });
    }

    // Para mostrar los datos necesario y no todo el array usamos for each y lo guardamos en un nuevo array
    const actividadesDatos = [];
    actividadesProfesor.forEach((actividad) => {
        let promedioActividad = 0;
        const notas = actividad.notas.map((nota) => nota.nota);
        //console.log(notas);
        promedioActividad = promedio(notas);
        //console.log(promedioActividad);

        actividadesDatos.push({
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            ponderacion: actividad.ponderacion,
            promedio: promedioActividad,
        });
    });

    // Retornamos las actividades
    //res.status(200).send(actividadesProfesor);
    res.status(200).send(actividadesDatos);
};

// Endpoint para subir los alumnos del profesor
exports.uploadAlumnos = (req, res) => {
    const { codigoCourse, codigoProfesor } = req.params;
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
            jsonData.forEach((alumno) => {
                // Verificar si el alumno ya existe
                const existe = alumnosCarnet.some(
                    (a) => a.carnet === alumno.carnet && a.curso === codigoCourse && a.profesor === codigoProfesor
                );

                // Si no existe, lo agregamos
                if (!existe) {
                    //alumnosCarnet.push(alumno);
                    alumnosCarnet.push({
                        carnet: parseInt(alumno.carnet),
                        curso: codigoCourse,
                        profesor: codigoProfesor
                    })
                } // Si existe no es necesario hacer nada
            });

            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ message: "Error al eliminar el archivo" });
                }
            });

            // Incrementamos el numero de alumnos del curso
            let tamanio = 0;
            //console.log(alumnosCarnet);
            alumnosCarnet.forEach((alumno) => {
                if (alumno.curso === codigoCourse && alumno.profesor === codigoProfesor) {
                    tamanio += 1;
                }
            });

            //console.log(tamanio);
            incrementarAlumnos(codigoCourse, codigoProfesor, tamanio);

            return res.send({ message: "Archivo procesado correctamente" });
        } catch (error) {
            return res
                .status(400)
                .send({ message: "Error al procesar el archivo" });
        }
    });
};

exports.obteneralumnos = (req, res) => {
    const { codigoProfesor, codigoCourse } = req.params;
    //console.log(alumnosCarnet);
    //console.log(estudiantes);

    // Buscamos los datos del alumno
    alumnosCarnet.forEach((alumno) => {
        // Buscamos el nombre del estudiante
        const estudiante = estudiantes.find(
            (e) => parseInt(e.carnet) === parseInt(alumno.carnet)
        );

        // Si no existe, lo agregamos
        if (estudiante) {
            alumnos.push({
                ...alumno,
                nombre: estudiante.nombre
            })
        }
    });

    //console.log(alumnos);
    // Retornamos los alumnos
    res.status(200).send(alumnos);
};

// Esta funcion se encarga de sacar el promedio de las notas
function promedio(nota) {
    const promedio = nota.reduce((a, b) => a + b, 0) / nota.length;
    // if (!Array.isArray(nota) || nota.length === 0) {
    //     return 0; // Si no es un array o esta vacio retornara 0
    // }

    //return promedio;
    return parseFloat(promedio.toFixed(2)); // Para que solo muestre 2 decimales
}
