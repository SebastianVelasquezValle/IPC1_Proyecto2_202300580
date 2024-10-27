// Dependencias
const express = require('express'); // express
const cors = require('cors'); 
//const bodyParser = require('body-parser'); // ya no lo usamos gracias a express.json() se puede hacer lo mismo
//const fs = require('fs'); // el fs solo aplica a este archivo, si lo usamos en otro archivo, debemos importarlo en ese archivo
const auth = require('./routes/auth'); // middleware de autenticación
const adminRouter = require('./routes/adminRoutes');
const studentRouter = require('./routes/studenRoutes');
const teacherRouter = require('./routes/teacherRoutes');

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json()); // Middleware para parsear el body de las peticiones
// Ya no debemos de colocar express.json en los demás archivos de rutas, ya que con esta línea de código se hace global

// Endpoints de prueba
app.get("/", (req, res) => {
    res.send("Backend ejecutando correctamente");
});
// Endpoints de ejecución
app.use("/login", auth); 
app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

// Manejo de ruta cuando no se encuentre la ruta solicitada
app.use((req, res) => {
    res.status(404).send({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});