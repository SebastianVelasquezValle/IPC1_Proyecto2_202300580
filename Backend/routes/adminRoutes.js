const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

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






module.exports = router;