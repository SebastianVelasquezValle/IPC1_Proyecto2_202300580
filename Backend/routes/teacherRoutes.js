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
// le colocamos el codigo para que sea mas facil identificarlo y buscarlo, excepto en las cargas de archivos

// Endpoint para ver los cursos del profesor
router.get('/home/:codigo', teacherController.obtenerCursos);

// Endpoint para cargar las actividades del profesor
router.post('/course', upload.single('file'), teacherController.uploadActvidades);

// Endpoint para obtener las actividades del profesor
router.get('/course/:codigo', teacherController.obteneractividades);

// Endpoint para subir los alumnos del profesor
//router.post('/course/:codigo', upload.single('file'), teacherController.uploadAlumnos);

// Endpoint para obtener los alumnos del profesor
//router.get('/course/:codigo', teacherController.obteneralumnos);

module.exports = router;