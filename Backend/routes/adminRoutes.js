const express = require('express');
const router = express.Router();
const multer  = require('multer') // Importamos multer para poder subir archivos, este es para poder cargar archivo seleccionado la ruta del archivo
const upload = multer({ dest: 'uploads/' }) // Indicamos la carpeta donde se subiran los archivos

// importamos los controladores 
//const mainController = require('../controllers/mainController');
const adminController = require('../controllers/adminController');

//  ------> Endpoints de prueba general
router.get("/", (req, res) => {
    res.send("Routes ejecutando correctamente");
});

// ------> Endpoints Modulo Admin <------
// Endpoint de prueba para el modulo admin
router.get('/admin-salundo', adminController.saludo);

// ------> Endpoints para el profesor

// Endpoint para subir un archivos profesores
router.post('/upload', upload.single('file'), adminController.upload);

// este endpoint es para obtener los profesores solo es de prueba ya que no se pide de esta manera 
router.get('/upload', adminController.obtenerprofesores);

// Endpoint para actualizar un archivo
router.put('/upload/:codigo', adminController.update);

// Endpoint para eliminar un archivo
router.delete('/upload/:codigo', adminController.delete);

// Endpoint para descargar un archivo
router.get('/upload/download-profesores', adminController.download);

// ------> Endpoints para el estudiante

// Endpoint para subir un archivos estudiantes
router.post('/students', upload.single('file'), adminController.students);

// este endpoint es para obtener los estudiantes solo es de prueba 
router.get('/students', adminController.obtenerestudiantes);

// Endpoint para actualizar un archivo
router.put('/students/:carnet', adminController.updatestudents);

// Endpoint para eliminar un archivo
router.delete('/students/:carnet', adminController.deletestudents);

// Endpoint para descargar un archivo
router.get('/students/download-students', adminController.downloadstudents);

// ------> Endpoints para el curso

// Endpoint para subir un archivos cursos
router.post('/course', upload.single('file'), adminController.courses);

// este endpoint es para obtener los cursos solo es de prueba
router.get('/course', adminController.obtenercursos);

// Endpoint para actualizar un archivo
router.put('/course/:codigo', adminController.updatecourses);

// Endpoint para eliminar un archivo
router.delete('/course/:codigo', adminController.deletecourses);

// Endpoint para descargar un archivo
router.get('/course/download-courses', adminController.downloadcourses);

module.exports = router;