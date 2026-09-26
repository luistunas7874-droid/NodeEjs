const express = require("express");
const equipos = require("./data/equipos");

const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON
app.use(express.json());
app.use(express.static("public"));

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "Football Stats API funcionando ⚽",
        rutas: [
            "/equipos",
            "/equipos/1",
            "/buscar?nombre=Chivas",
            "/comparar?id1=1&id2=2"
        ]
    });
});

// Obtener todos los equipos
app.get("/equipos", (req, res) => {
    res.json(equipos);
});

// Obtener un equipo por su ID
app.get("/equipos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const equipo = equipos.find(equipo => equipo.id === id);

    if (!equipo) {
        return res.status(404).json({
            error: "Equipo no encontrado"
        });
    }

    res.json(equipo);
});

// Buscar equipos por nombre
app.get("/buscar", (req, res) => {
    const nombre = req.query.nombre?.toLowerCase();

    if (!nombre) {
        return res.status(400).json({
            error: "Debes escribir un nombre para buscar"
        });
    }

    const resultados = equipos.filter(equipo =>
        equipo.nombre.toLowerCase().includes(nombre)
    );

    res.json(resultados);
});

// Comparar los títulos de dos equipos
app.get("/comparar", (req, res) => {
    const id1 = parseInt(req.query.id1);
    const id2 = parseInt(req.query.id2);

    const equipo1 = equipos.find(equipo => equipo.id === id1);
    const equipo2 = equipos.find(equipo => equipo.id === id2);

    if (!equipo1 || !equipo2) {
        return res.status(404).json({
            error: "Uno o ambos equipos no existen"
        });
    }

    res.json({
        equipo1: equipo1.nombre,
        equipo2: equipo2.nombre,
        titulosEquipo1: equipo1.titulos,
        titulosEquipo2: equipo2.titulos,
        diferenciaTitulos: equipo1.titulos - equipo2.titulos
    });
});

// Agregar un nuevo equipo
app.post("/equipos", (req, res) => {
    const { nombre, pais, liga, titulos } = req.body;

    // Verificar que todos los datos estén completos
    if (!nombre || !pais || !liga || titulos === undefined) {
        return res.status(400).json({
            error: "Faltan datos del equipo"
        });
    }

    const nuevoEquipo = {
        id: Math.max(...equipos.map(equipo => equipo.id)) + 1,
        nombre: nombre,
        pais: pais,
        liga: liga,
        titulos: titulos
    };

    equipos.push(nuevoEquipo);

    res.status(201).json({
        mensaje: "Equipo agregado correctamente",
        equipo: nuevoEquipo
    });
});

// Eliminar un equipo
app.delete("/equipos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const indice = equipos.findIndex(equipo => equipo.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: "Equipo no encontrado"
        });
    }

    const equipoEliminado = equipos.splice(indice, 1);

    res.json({
        mensaje: "Equipo eliminado correctamente",
        equipo: equipoEliminado[0]
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});