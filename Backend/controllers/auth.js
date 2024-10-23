const fs = require("fs");

const { profesores, estudiantes } = require("./adminController");

// Esta función se encarga de buscar el usuario (sin contar al admin) en los 2 arrays de profesores y estudiantes
exports.login = (req, res) => {
    const { codigo_carnet, contrasenia } = req.body;

    // console.log(profesores);
    // console.log(estudiantes);

    // Verificar si los campos están vacíos
    if (!codigo_carnet || !contrasenia) {
        return res.status(400).send({ message: "Faltan campos por llenar" });
    }

    // Verificar si el usuario es el admin
    if (codigo_carnet === "admin" && contrasenia === "admin") {
        return res
            .status(200)
            .send({
                message: "Inicio de sesión exitoso",
                usuario: { codigo: "admin", constrasenia: "admin", rol: "admin" },
            });
    }

    // Buscar al usuario en los arrays de profesores y estudiantes
    const usuario =
        profesores.find(
            (usuario) =>
                usuario?.codigo === codigo_carnet &&
                usuario?.contrasenia === contrasenia
        ) ||
        estudiantes.find(
            (usuario) =>
                usuario?.carnet === codigo_carnet &&
                usuario?.contrasenia === contrasenia
        );

    // console.log(usuario);

    // Verificar si el usuario no existe
    if (!usuario) {
        return res.status(404).send({ message: "Credenciales incorrectas" });
    }

    // Vemos si es profesor o estudiante
    let rol = "estudiante"; 
    if (usuario.codigo && usuario.codigo.includes("ECYSP")) {
        rol = "profesor";
    }

    //res.status(200).send({ message: "Inicio de sesión exitoso", usuario: { codigo: usuario.carnet || usuario.codigo, consetrasenia: usuario.contrasenia, rol } }); // Este es solos si queremos que se vea el usuario y contraseña
    res.status(200).send({ message: "Inicio de sesión exitoso", user: { 
        ...usuario
        , rol } }); // este es si queremos ver todos los datos del usuario
};

// };
