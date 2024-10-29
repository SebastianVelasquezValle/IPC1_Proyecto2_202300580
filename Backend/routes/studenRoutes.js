const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get("/", (req, res) => {
    res.send("Routes ejecutando correctamente");
});

router.get('/student-saludo', studentController.saludo); // Endpoint para verificar que el controlador funciona correctamente

// Endpoints para el estudiante
// le colocamos el codigo del estudiante y codigo del curso para que sea mas facil identificarlo y buscarlo

// Endpoint para ver los cursos asignados del estudiante
router.get('/home/:carnet', studentController.obtenerCursos);

// Endpoint para ver la informacion del curso asignado al estudiante
router.get('/course/:carnet/:codigoProfesor/:codigoCourse', studentController.obtenerCursoInfo);

// Endpoint para descargar un archivo
router.get('/course/download/:carnet/:codigoProfesor/:codigoCourse', studentController.download);

// Endpoint para obtener las notas totales del estudiante de cada curso (para la grafica)
router.get('/course/grafica/:carnet', studentController.obtenerNotasGrafica);

module.exports = router;