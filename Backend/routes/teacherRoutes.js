const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const teacherController = require('../controllers/teacherController');

router.get("/", (req, res) => {
    res.send("Routes ejecutando correctamente");
});

router.get('/teacher-saludo', teacherController.saludo); // Endpoint para verificar que el controlador funciona correctamente

// Endpoints para el profesor 
// le colocamos el codigo del profesor y codigo del curso para que sea mas facil identificarlo y buscarlo

// Endpoint para ver los cursos del profesor
router.get('/home/:codigo', teacherController.obtenerCursos);

// Endpoint para cargar las actividades del profesor
router.post('/course/actividad/:codigoProfesor/:codigoCourse', upload.single('file'), teacherController.uploadActvidades);

// Endpoint para obtener las actividades del profesor
router.get('/course/actividad/:codigoProfesor/:codigoCourse', teacherController.obteneractividades);

// Endpoint para obtener las actividades del profesor (con advertencia)(opcional)
router.get('/course/actividad/:codigo/a', teacherController.obteneractividades_Advert);

// Endpoint para subir los alumnos del profesor
router.post('/course/alumno/:codigoProfesor/:codigoCourse', upload.single('file'), teacherController.uploadAlumnos);

// Endpoint para obtener los alumnos del profesor
router.get('/course/alumno/:codigoProfesor/:codigoCourse', teacherController.obteneralumnos);

// Endpoint para obtener los alumnos que se encuentran inscritos en el curso
// tambien mostrara el detalle de las actividades cargadas y los puntos acumulados
//router.get('/course/alumno/:codigo/a', teacherController.obtenerAlumnosInscritos);


module.exports = router;