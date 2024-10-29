const fs = require("fs"); // Importamos el modulo fs para poder trabajar con archivos

// importamos la funcion para incrementar los alumnos, cursos y estudiantes (este array solo nos servira para buscar el nombre del estudiantes)
const { cursos, estudiantes, profesores } = require("./adminController");
const { parse } = require("path");

exports.saludo = (req, res) => {
    res.send("Profesor Controller ejecutando correctamente");
};

// Variable temporal para almacenar las actividades
const actividades = []; // este es el array donde se guardaran las actividades y sufrira cambios
// Variable temporal para almacenar los alumnos
const alumnosCarnet = []; // el array alumnos contendra todos los datos del estudiante, y le agregamos el codigo del curso y el profesor

function incrementarAlumnos(codigoCurso, codigoProfesor, cantidad) {
    // Buscamos el curso en el array 'cursos'
    const curso = cursos.find(
        (curso) =>
            parseInt(curso.codigo) === parseInt(codigoCurso) &&
            curso.profesor === codigoProfesor
    );

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
}

// Esta funcion se encarga de sacar el promedio de las notas
function promedio(nota) {
    const promedio = nota.reduce((a, b) => a + b, 0) / nota.length;
    // if (!Array.isArray(nota) || nota.length === 0) {
    //     return 0; // Si no es un array o esta vacio retornara 0
    // }

    //return promedio;
    return parseFloat(promedio.toFixed(2)); // Para que solo muestre 2 decimales
}

function obtenerNombreCurso(codigoCurso) {
    const curso = cursos.find((curso) => parseInt(curso.codigo) === parseInt(codigoCurso));
    return curso ? curso.nombre : "Curso no encontrado";
}
// Esta función calcular la cantidad de actividades que hay en el array del curso, si supera el limite de actividades (100), no se podra agregar mas actividades
// let superoLimite = false;
// function cantidadActividades(codigoCurso, codigoProfesor, cantidad) {
//     const actividadesCurso = actividades.filter(
//         (actividad) =>
//             actividad.curso === codigoCurso && actividad.profesor === codigoProfesor
//     );
//     return actividadesCurso.length;

// } // posiblemente no se necesite esta funcion

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
// Este endpoint/middleware no es necesario el codigo del profesor, ya que se puede obtener del archivo
exports.uploadActvidades = (req, res) => {
    const { codigoProfesor, codigoCourse } = req.params;

    // if (superoLimite) { // Si supero el limite de actividades, no se podra agregar mas actividades
    //     return res.status(400).send({ message: "No se puede agregar mas actividades" });
    // }

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
                // Verificamos si el profesor de la actividad coincide con el el codigo del profesor
                // if (actividad.profesor !== codigoProfesor) {
                //     return;
                // }

                // Verificar si la actividad ya existe
                const existe = actividades.some(
                    (a) =>
                        a.nombre === actividad.nombre &&
                        a.profesor === actividad.profesor &&
                        a.curso === codigoCourse
                );

                // Si no existe, lo agregamos
                if (!existe) {
                    //actividades.push(actividad);
                    actividades.push({
                        ...actividad,
                        curso: codigoCourse,
                    });
                } else {
                    // Si existe, actualizamos los datos
                    const actividadIndex = actividades.findIndex(
                        (a) =>
                            a.nombre === actividad.nombre &&
                            a.profesor === actividad.profesor &&
                            a.curso === codigoCourse
                    );
                    actividades[actividadIndex] = {
                        ...actividad,
                        curso: codigoCourse,
                    };
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

// Endpoint para obtener las actividades del profesor, solo contara a los alumnos que esten inscritos en el curso, esto se comprueba con el array alumnosCarnet (este es el que tiene los alumnos inscritos)
exports.obteneractividades = (req, res) => {
    const { codigoProfesor, codigoCourse } = req.params;
    // Buscamos las actividades del profesor
    const actividadesProfesor = actividades.filter(
        (actividad) =>
            actividad.profesor === codigoProfesor &&
            parseInt(actividad.curso) === parseInt(codigoCourse)
    );
    //console.log(actividadesProfesor);
    // console.log("Actividades antes de filtrar");
    // actividadesProfesor.forEach((actividad) => {
    //     if (!actividad.notas) {
    //         actividad.notas = { notae: [] };
    //     }
    //     console.log(actividad.notas);
    // });

    // Para mostrar los datos necesario y no todo el array usamos for each y lo guardamos en un nuevo array
    const actividadesDatos = [];
    actividadesProfesor.forEach((actividad) => {
        //Filtamos los alumnos inscritos en el curso
        const notasAlumnosInscritos = actividad.notas.filter((nota) =>
            alumnosCarnet.some(
                (alumno) => parseInt(alumno.carnet) === parseInt(nota.carnet)
            )
        );
        //console.log(notasAlumnosInscritos);
        // console.log("Actividades despues de filtrar");
        // console.log(notasAlumnosInscritos);

        let promedioActividad = 0;
        if (notasAlumnosInscritos.length > 0) {
            const notas = notasAlumnosInscritos.map((nota) => nota.nota);
            //console.log(notas);
            promedioActividad = promedio(notas);
            //console.log(promedioActividad);
        }

        // const notas = actividad.notas.map((nota) => nota.nota);
        // //console.log(notas);
        // promedioActividad = promedio(notas);
        // //console.log(promedioActividad);

        actividadesDatos.push({
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            ponderacion: actividad.ponderacion,
            promedio: promedioActividad,
        });
    });

    // const cantidad = cantidadActividades(codigoCourse, codigoProfesor); // Obtenemos la cantidad de actividades
    // //console.log(cantidad);
    // if (cantidad >= 100) { // Si la cantidad de actividades supera el limite de 100, no se podra agregar mas actividades
    //     superoLimite = true; // Cambiamos el valor de la variable a true
    //     return res.status(400).send({ message: "No se puede agregar mas actividades" });
    // }
    // Retornamos las actividades
    //res.status(200).send(actividadesProfesor);
    //console.log(actividades);
    res.status(200).send(actividadesDatos); // original
    //res.status(200).send(alumnosCarnet);
    //res.status(200).send(actividades);
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
    const nombreCurso = obtenerNombreCurso(codigoCourse);
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
                    (a) =>
                        a.carnet === alumno.carnet &&
                        a.curso === codigoCourse &&
                        a.profesor === codigoProfesor
                );

                // Si no existe, lo agregamos
                // Comentare esta condición para probar otra forma, de agregar el nombre del estudiante
                // if (!existe) {
                //     alumnosCarnet.push({
                //         carnet: parseInt(alumno.carnet),
                //         curso: codigoCourse,
                //         profesor: codigoProfesor,
                //     });
                // } // Si existe no es necesario hacer nada

                // Si no existe, lo agregamos
                if (!existe) {
                    // Buscamos el nombre del estudiante
                    const estudiante = estudiantes.find(
                        (e) => parseInt(e.carnet) === parseInt(alumno.carnet)
                    );

                    if (!estudiante) {
                        // Si no se encuentra el estudiante
                        //return res.status(404).send({ message: "Estudiante no encontrado" });
                        return; // Si no se encuentra el estudiante, no se agregara al array
                    }

                    // Agregamos al alumnos y  el nombre del estudiante al array
                    alumnosCarnet.push({
                        carnet: parseInt(alumno.carnet),
                        curso: codigoCourse,
                        profesor: codigoProfesor,
                        nombre: estudiante ? estudiante.nombre : "Desconocido",
                        CursoNombre: nombreCurso,
                    });
                }
            });

            // Incrementamos el numero de alumnos del curso
            // let tamanio = 0;
            // //console.log(alumnosCarnet);
            // alumnosCarnet.forEach((alumno) => {
            //     if (
            //         alumno.curso === codigoCourse &&
            //         alumno.profesor === codigoProfesor
            //     ) {
            //         tamanio += 1;
            //     }
            // });

            // Otro forma de hacerlo
            const tamanio = alumnosCarnet.filter(
                (alumno) =>
                    alumno.curso === codigoCourse &&
                    alumno.profesor === codigoProfesor
            ).length;

            //console.log("Tamanio a incrementar:" + tamanio);
            incrementarAlumnos(codigoCourse, codigoProfesor, tamanio);

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

exports.obteneralumnos = (req, res) => {
    const { codigoProfesor, codigoCourse } = req.params;
    //console.log(alumnosCarnet);
    //console.log(estudiantes);
    const alumnosFiltrados = alumnosCarnet.filter(
        (alumno) =>
            alumno.profesor === codigoProfesor && alumno.curso === codigoCourse
    );

    // Retornamos los alumnos
    res.status(200).send(alumnosFiltrados);
};

// Endpoint para obtener los 5 mejores alumnos del curso(esto es para los reportes)
exports.obtenerTopAlumnosMayor = (req, res) => {
    const { codigoProfesor, codigoCourse } = req.params;
    const actividadesProfesor = actividades.filter(
        // Buscamos las actividades del profesor
        (actividad) =>
            actividad.profesor === codigoProfesor &&
            parseInt(actividad.curso) === parseInt(codigoCourse)
    );

    if (actividadesProfesor.length === 0) {
        return res
            .status(404)
            .send({ message: "No se encontraron actividades" });
    }

    const notasAlumnos = [];

    actividadesProfesor.forEach((actividad) => {
        const notasAlumnosInscritos = actividad.notas.filter((nota) =>
            alumnosCarnet.some(
                (alumno) => parseInt(alumno.carnet) === parseInt(nota.carnet)
            )
        );
        notasAlumnos.push(...notasAlumnosInscritos);
    });

    const notasusuario = notasAlumnos.reduce((acc, nota) => {
        if (!acc[nota.carnet]) {
            acc[nota.carnet] = [];
        }
        acc[nota.carnet].push(nota.nota);
        //console.log("Acumulador en proceso:", acc);
        return acc;
    }, {});

    //console.log("Nota de los usuarios: ", notasusuario);

    const promedios = Object.keys(notasusuario).map((carnet) => {
        const notas = notasusuario[carnet];
        const promedio =
            notas.length > 0
                ? notas.reduce((a, b) => a + b, 0) / notas.length
                : 0;

        const alumno = alumnosCarnet.find(
            (alumno) => alumno.carnet === parseInt(carnet)
        );
        return {
            carnet: carnet,
            nombre: alumno ? alumno.nombre : "Desconocido",
            promedio: parseFloat(promedio.toFixed(2)),
        };
    });
    // Ordenamos los promedios de mayor a menor
    const topAlumnos = promedios
        .sort((a, b) => b.promedio - a.promedio)
        .slice(0, 5);

    //console.log("Top alumnos: ", topAlumnos);

    res.status(200).send(topAlumnos);
};

// Endpoint para obtener los 5 peores alumnos del curso(esto es para los reportes)
exports.obtenerTopAlumnosMenor = (req, res) => {
    const { codigoProfesor, codigoCourse } = req.params;
    const actividadesProfesor = actividades.filter(
        // Buscamos las actividades del profesor
        (actividad) =>
            actividad.profesor === codigoProfesor &&
            parseInt(actividad.curso) === parseInt(codigoCourse)
    );

    if (actividadesProfesor.length === 0) {
        return res
            .status(404)
            .send({ message: "No se encontraron actividades" });
    }

    const notasAlumnos = [];

    actividadesProfesor.forEach((actividad) => {
        const notasAlumnosInscritos = actividad.notas.filter((nota) =>
            alumnosCarnet.some(
                (alumno) => parseInt(alumno.carnet) === parseInt(nota.carnet)
            )
        );
        notasAlumnos.push(...notasAlumnosInscritos);
    });

    const notasusuario = notasAlumnos.reduce((acc, nota) => {
        if (!acc[nota.carnet]) {
            acc[nota.carnet] = [];
        }
        acc[nota.carnet].push(nota.nota);
        //console.log("Acumulador en proceso:", acc);
        return acc;
    }, {});

    const promedios = Object.keys(notasusuario).map((carnet) => {
        const notas = notasusuario[carnet];
        const promedio =
            notas.length > 0
                ? notas.reduce((a, b) => a + b, 0) / notas.length
                : 0;

        const alumno = alumnosCarnet.find(
            (alumno) => alumno.carnet === parseInt(carnet)
        );
        return {
            carnet: carnet,
            nombre: alumno ? alumno.nombre : "Desconocido",
            promedio: parseFloat(promedio.toFixed(2)),
        };
    });

    // Ordenamos los promedios de menor a mayor
    const topAlumnosMenor = promedios
        .sort((a, b) => a.promedio - b.promedio)
        .slice(0, 5);

    //console.log("Top alumnos: ", topAlumnosMenor);
    res.status(200).send(topAlumnosMenor);
};

exports.actividades = actividades; // Exportamos el array de actividades
exports.alumnosCarnet = alumnosCarnet; // Exportamos el array de alumnos
