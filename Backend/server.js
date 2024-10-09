// Dependencias
const express = require('express'); // express
//const cors = require('cors'); 
//const bodyParser = require('body-parser');
//const fs = require('fs');
const mainRouter = require('./routes/mainRouter');

const app = express();
const PORT = 4000;

// app.use(cors());
// app.use(bodyParser.json());

// Endpoints de prueba
app.get("/", (req, res) => {
    res.send("Backend ejecutando correctamente");
});
// Endpoint de ejecución
app.use("/api", mainRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});