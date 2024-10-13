// usaremos express.json, ya esta importado en el archivo server.js
const fs = require('fs'); // Importamos el modulo fs para poder trabajar con archivos

// Variable para almacenar los datos de los profesores
const profesores = [];

exports.saludo = (req, res) => {
    res.send("Admin Controller ejecutando correctamente");
};

exports.upload = (req, res) => {
    // Verificamos si se ha subido un archivo
    if (!req.file) {
        return res.status(400).send({ message: "No se ha subido un archivo" });
    }

    fs.readFile(req.file.path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: "Error al leer el archivo" });
        }
        try {
            const jsonData = JSON.parse(data);
            jsonData.forEach((profesor) => {
                profesores.push(profesor);
            });
            //console.log(profesores);
            
            // Eliminar el archivo
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res.status(500).send({ message: "Error al eliminar el archivo" });
                }
            });

            return res.send({ message: "Archivo procesado correctamente" });
        } catch (error) {
            return res.status(400).send({ message: "Error al procesar el archivo" });
            
        }
    });
};
