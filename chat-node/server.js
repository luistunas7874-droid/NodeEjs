const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("Un usuario se conectó");

    socket.on("mensaje", (mensaje) => {
        io.emit("mensaje", mensaje);
    });

    socket.on("disconnect", () => {
        console.log("Un usuario se desconectó");
    });
});

server.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});