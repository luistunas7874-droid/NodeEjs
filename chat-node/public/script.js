const socket = io();

function enviarMensaje() {
    const input = document.getElementById("mensaje");
    const mensaje = input.value;

    if (mensaje.trim() === "") {
        return;
    }

    socket.emit("mensaje", mensaje);
    input.value = "";
}

socket.on("mensaje", (mensaje) => {
    const mensajes = document.getElementById("mensajes");

    const nuevoMensaje = document.createElement("p");
    nuevoMensaje.textContent = mensaje;

    mensajes.appendChild(nuevoMensaje);
    mensajes.scrollTop = mensajes.scrollHeight;
});