import { rarezaRandom, descuentoRandom, aplicarDescuentoPorRareza, actualizarInventario } from "./mercado.js";


/**
 * Gestiona el cambio de escenas ocultando todas y mostrando la deseada.
 * @param {string} idEscena - El ID del contenedor HTML de la escena a mostrar.
 */
export function mostrarEscena(idEscena) {
    // Selecciona todos los elementos con la clase 'scene' y los oculta 
    const escenas = document.querySelectorAll('.scene');
    escenas.forEach(escena => {
        escena.style.display = 'none'; 
    });

    // Muestra la escena específica 
    const escenaActiva = document.getElementById(idEscena);
    if (escenaActiva) {
        escenaActiva.style.display = 'block';
    }
}

/**
 * Renderiza la tarjeta informativa del jugador con sus estadísticas iniciales.
 * @param {Jugador} jugador - Instancia de la clase Jugador con los datos.
 */
export function mostrarJugador(jugador) {
    const contenedorStats = document.getElementById("stat-box");
    const contenedorProtagonista = document.querySelector(".protagonista");

    // Insertar la imagen y nombre en la zona del avatar [cite: 51, 52]
    contenedorProtagonista.innerHTML = `
        <img src="img/${jugador.avatar}" alt="Avatar de ${jugador.nombre}" id="avatar-img">
        <p><b>${jugador.nombre}</b></p>
    `;

    // Insertar las estadísticas
    contenedorStats.innerHTML = `
        <div class="stat-item"><b>Ataque:</b> ${jugador.ataque}</div>
        <div class="stat-item"><b>Defensa:</b> ${jugador.defensa}</div>
        <div class="stat-item"><b>Vida:</b> ${jugador.vida}</div>
        <div class="stat-item"><b>Puntos:</b> ${jugador.puntos}</div>
    `;

}

// Funcion para mostrar el mercado
export function mostrarMercado(jugador) {
    const mercadoDiv = document.getElementById("mercado");
    const pDinero = document.getElementById("dinero");
    const casillasFooter = document.querySelectorAll("#inventory-container .item");

    // Función simple para actualizar el texto del dinero
    const actualizarTextoDinero = () => {
        pDinero.innerHTML = `<em>ORO DISPONIBLE:</em> ${jugador.dinero} 💰`;
    };

    mercadoDiv.innerHTML = "";
    actualizarTextoDinero();

    const rarezaAleatoria = rarezaRandom();
    const descuentoAleatorio = descuentoRandom();
    const mercadoConDescuento = aplicarDescuentoPorRareza(rarezaAleatoria, descuentoAleatorio);

    mercadoConDescuento.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        productoDiv.innerHTML = `
            <div class="infoProducto">
                <img src="img/${producto.imagen}" class="imgProducto">
                <p><strong>${producto.nombre}</strong></p>
                <p class="bonus-texto">${producto.mostrarBonus()}</p>
                <p class="precio-texto">Precio: ${producto.precioEuros}</p>
            </div>
        `;

        const botonAccion = document.createElement("button");
        botonAccion.innerHTML = "Añadir";
        botonAccion.classList.add("botonComprar");

        botonAccion.addEventListener("click", () => {
            // Buscamos si el producto está en el inventario
            const indiceEnInventario = jugador.inventario.findIndex(p => p.nombre === producto.nombre);

            if (indiceEnInventario === -1) {
                
                if (jugador.dinero < producto.precio) {
                    alert("No tienes suficiente dinero");
                    return;
                }

                if (jugador.inventario.length >= casillasFooter.length) {
                    alert("Inventario lleno");
                    return;
                }

                jugador.dinero -= producto.precio;
                jugador.inventario.push(producto);
                
                botonAccion.textContent = "Retirar";
                botonAccion.classList.add("boton-retirar");
            } else {
                
                jugador.dinero += producto.precio;
                jugador.inventario.splice(indiceEnInventario, 1);
                
                botonAccion.textContent = "Añadir";
                botonAccion.classList.remove("boton-retirar");
            }
            actualizarTextoDinero();
            actualizarInventario(casillasFooter, jugador.inventario);
        });

        productoDiv.appendChild(botonAccion);
        mercadoDiv.appendChild(productoDiv);
    });
}