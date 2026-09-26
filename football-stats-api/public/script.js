async function cargarEquipos() {
    const respuesta = await fetch("/equipos");
    const equipos = await respuesta.json();

    const lista = document.getElementById("listaEquipos");

    lista.innerHTML = "";

    equipos.forEach(equipo => {
        lista.innerHTML += `
            <div class="equipo">
                <h3>${equipo.nombre}</h3>
                <p><strong>ID:</strong> ${equipo.id}</p>
                <p><strong>País:</strong> ${equipo.pais}</p>
                <p><strong>Liga:</strong> ${equipo.liga}</p>
                <p><strong>Títulos:</strong> ${equipo.titulos}</p>
            </div>
        `;
    });
}

async function buscarEquipo() {
    const nombre = document.getElementById("nombreBuscar").value;

    const respuesta = await fetch(`/buscar?nombre=${nombre}`);
    const equipos = await respuesta.json();

    const resultado = document.getElementById("resultadoBusqueda");

    resultado.innerHTML = "";

    if (equipos.length === 0) {
        resultado.innerHTML = "<p>No se encontró ningún equipo.</p>";
        return;
    }

    equipos.forEach(equipo => {
        resultado.innerHTML += `
            <div class="equipo">
                <h3>${equipo.nombre}</h3>
                <p>País: ${equipo.pais}</p>
                <p>Liga: ${equipo.liga}</p>
                <p>Títulos: ${equipo.titulos}</p>
            </div>
        `;
    });
}

async function compararEquipos() {
    const id1 = document.getElementById("idEquipo1").value;
    const id2 = document.getElementById("idEquipo2").value;

    const respuesta = await fetch(`/comparar?id1=${id1}&id2=${id2}`);
    const resultado = await respuesta.json();

    const contenedor = document.getElementById("resultadoComparacion");

    if (resultado.error) {
        contenedor.innerHTML = `<p>${resultado.error}</p>`;
        return;
    }

    contenedor.innerHTML = `
        <div class="equipo">
            <h3>${resultado.equipo1} vs ${resultado.equipo2}</h3>
            <p>${resultado.equipo1}: ${resultado.titulosEquipo1} títulos</p>
            <p>${resultado.equipo2}: ${resultado.titulosEquipo2} títulos</p>
            <p>Diferencia de títulos: ${resultado.diferenciaTitulos}</p>
        </div>
    `;
}

async function agregarEquipo() {
    const nombre = document.getElementById("nuevoNombre").value;
    const pais = document.getElementById("nuevoPais").value;
    const liga = document.getElementById("nuevaLiga").value;
    const titulos = document.getElementById("nuevosTitulos").value;

    const respuesta = await fetch("/equipos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            pais: pais,
            liga: liga,
            titulos: Number(titulos)
        })
    });

    const resultado = await respuesta.json();

    document.getElementById("resultadoAgregar").innerHTML =
        `<p>${resultado.mensaje || resultado.error}</p>`;
}

async function eliminarEquipo() {
    const id = document.getElementById("idEliminar").value;

    const respuesta = await fetch(`/equipos/${id}`, {
        method: "DELETE"
    });

    const resultado = await respuesta.json();

    document.getElementById("resultadoEliminar").innerHTML =
        `<p>${resultado.mensaje || resultado.error}</p>`;
}