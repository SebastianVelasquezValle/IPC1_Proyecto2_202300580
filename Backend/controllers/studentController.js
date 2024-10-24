const fs = require('fs'); // Importamos el modulo fs para poder trabajar con archivos
const XLSX = require('xlsx'); // Importamos la libreria xlsx para poder leer archivos excel

const { alumnosCarnet, actividades } = require("./teacherController");

exports.saludo = (req, res) => {
    res.send("Student Controller ejecutando correctamente");
};

// Variables para almacenar los datos de los estudiantes
const infoEstudiantes = [];

// Endpoint para ver los cursos asignados del estudiante
exports.obtenerCursos = (req, res) => {
    const { carnet } = req.params;

    const cursos = alumnosCarnet.filter((alumno) => parseInt(alumno.carnet) === parseInt(carnet));
    //console.log(alumnosCarnet);

    if (cursos.length === 0) {
        return res.status(404).send({ message: "No se encontraron cursos asignados" });
    }
    res.status(200).send(cursos);
}

exports.obtenerCursoInfo = (req, res) => {
    const { carnet, codigoProfesor, codigoCourse } = req.params;

    const cursoActividad = actividades.filter((alumno) => parseInt(alumno.curso) === parseInt(codigoCourse) && alumno.profesor === codigoProfesor);

    if (cursoActividad.length === 0) {
        return res.status(404).send({ message: "No se encontraron actividades" });
    }

    const cursoInfo = []
    cursoActividad.forEach((actividad) => {
        if (!actividad.notas) {
            actividad.notas = {nota: []};
        }
        actividad.notas.forEach((nota) => {
            if (parseInt(nota.carnet) === parseInt(carnet)) {
                cursoInfo.push({
                    nombre: actividad.nombre,
                    descripcion: actividad.descripcion,
                    ponderacion: actividad.ponderacion,
                    nota: nota.nota
                });
            }
        });
    });

    const existe = infoEstudiantes.some((estudiante) => parseInt(estudiante.carnet) === parseInt(carnet) && parseInt(estudiante.curso) === parseInt(codigoCourse) && estudiante.profesor === codigoProfesor);

    if (!existe) {
        infoEstudiantes.push({
            carnet: carnet,
            curso: codigoCourse,
            profesor: codigoProfesor,
            info: cursoInfo
        });
    }

    //console.log(cursoActividad);
    // console.log(cursoInfo);
    // console.log(actividades)
    //console.log(infoEstudiantes);
    // infoEstudiantes.forEach((estudiante) => {
    //     console.log(estudiante.info);
    // });

    res.status(200).send(cursoInfo);
};

exports.download = (req, res) => {
    const { carnet, codigoProfesor, codigoCourse } = req.params;

    const existe = infoEstudiantes.some((estudiante) => parseInt(estudiante.carnet) === parseInt(carnet) && parseInt(estudiante.curso) === parseInt(codigoCourse) && estudiante.profesor === codigoProfesor); // Verificamos si el estudiante tiene actividades

    if (!existe) { // Si no tiene actividades
        return res.status(404).send({ message: "No se encontraron actividades" });
    } else { // Si tiene actividades
        // Buscamos las actividades del estudiante
        const cursoInfo = infoEstudiantes.find((estudiante) => parseInt(estudiante.carnet) === parseInt(carnet) && parseInt(estudiante.curso) === parseInt(codigoCourse) && estudiante.profesor === codigoProfesor);

        // Creamos un nuevo libro de excel
        const workbook = XLSX.utils.book_new();
        // Creamos una nueva hoja de excel
        const worksheet = XLSX.utils.json_to_sheet(cursoInfo.info);
        // Agregamos la hoja al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, "Notas");
        // Generar el archivo Excel en un buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        //Configurar los headers de la respuesta
        res.setHeader('Content-Disposition', 'attachment; filename=Notas.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // Enviar el archivo Excel como respuesta
        res.send(excelBuffer);
    }

};