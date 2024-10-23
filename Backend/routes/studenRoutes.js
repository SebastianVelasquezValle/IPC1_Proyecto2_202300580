const express = require('express');
const router = express.Router();

//const studentController = require('../controllers/studentController');

router.get("/", (req, res) => {
    res.send("Routes ejecutando correctamente");
});

// Endpoints para el estudiante

// Endpoint para ver los cursos del estudiante
//router.get('/courses', studentController.obtenerCursos);

// Endpoint para obtener la informacion del estudiante en el curso
//router.get('/course/:codigo', studentController.obtenerCurso);



module.exports = router;