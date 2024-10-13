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

// ------> Endpoints Modulo Admin

// Endpoint de prueba para el modulo admin
router.get('/admin-salundo', adminController.saludo);

// Endpoint para subir un archivos
router.post('/upload', upload.single('file'), adminController.upload);

// este endpoint es para obtener los profesores solo es de prueba ya que no se pide de esta manera 
router.get('/upload', adminController.obtenerprofesores);

// Endpoint para actualizar un archivo
router.put('/upload/:codigo', adminController.update);

// Endpoint para eliminar un archivo
router.delete('/upload/:codigo', adminController.delete);

// Endpoint para descargar un archivo
router.get('/upload/download-profesores', adminController.download);




module.exports = router;