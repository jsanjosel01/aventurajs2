import { rarezaRandom, descuentoRandom, aplicarDescuentoPorRareza, actualizarInventario } from "./mercado.js";

import { ENEMIGOS_DISPONIBLES } from "../constants.js";
import { batalla } from "./batalla.js";


// Inicar las batallas a 0
let indiceBatallaActual = 0;

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

// Funcion Mostrar jugador
export function mostrarJugador(jugador) {
    const contenedorStats = document.getElementById("stat-box");
    const contenedorProtagonista = document.querySelector(".protagonista");

    // Insertar la imagen y nombre en la zona del avatar 
    contenedorProtagonista.innerHTML = `
        <img src="img/${jugador.avatar}" alt="Avatar de ${jugador.nombre}" id="avatar-img">
        <p><b>${jugador.nombre}</b></p>
    `;

    // Insertar las estadísticas
    contenedorStats.innerHTML = `
        <div class="stat-item">⚔️ Ataque: ${jugador.ataque}</div>
        <div class="stat-item">🛡️ Defensa: ${jugador.defensa}</div>
        <div class="stat-item">❤️ Vida: ${jugador.vida}</div>
        <div class="stat-item">⭐ Puntos: ${jugador.puntos}</div>
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


// Función para mostrar el estado actual del jugador
export function mostrarEstadoActual(jugador) {
    const contenedorProta = document.querySelector("#escena-estado-actual .protagonista");
    const contenedorStats = document.getElementById("stat-box-actualizado");

    // Insertar la img y nombre
    contenedorProta.innerHTML = `
        <img src="img/${jugador.avatar}" alt="Avatar de ${jugador.nombre}" id="avatar-img-final">
        <p><b>${jugador.nombre}</b></p>
    `;

    // Insertar las estadísticas actualizadas
    contenedorStats.innerHTML = `
        <div class="stat-item">⚔️ Ataque Total: ${jugador.ataque}</div>
        <div class="stat-item">🛡️ Defensa Total: ${jugador.defensa}</div>
        <div class="stat-item">❤️ Vida Total: ${jugador.vida}</div>
        <div class="stat-item">⭐ Puntos Totales: ${jugador.puntos}</div>
    `;

    // Cambiamos a la escena 4
    mostrarEscena("escena-estado-actual");
}

// Función para mostrar los enemigos con sus estadísticas
export function mostrarEscenaEnemigos() {
    indiceBatallaActual = 0;
    const contenedor = document.getElementById("contenedor-enemigos");
    if (!contenedor) return; 
    
    contenedor.innerHTML = ""; 

    ENEMIGOS_DISPONIBLES.forEach((enemigo) => {
        const esJefe = enemigo.tipo === 'Jefe';
        const card = document.createElement("div");
        card.className = "producto"; 
        
        card.innerHTML = `
            <img src="img/${enemigo.avatar}" class="imgProducto" alt="${enemigo.nombre}">
            <div class="infoProducto">
                <p><b>${enemigo.nombre}</b></p>
                <p>⚔️ Ataque: ${enemigo.ataque}</p>
            </div>
        `;
        contenedor.appendChild(card);
    });
    // Cambiamos a la escena 5 (Enemigos)
    mostrarEscena("escena-enemigos");
}

window.iniciarCombate = (nombre) => {
    alert("¡Vas a luchar contra " + nombre + "!");
};

// ESCENA 6
export function irABatalla(jugador) {
    const enemigo = ENEMIGOS_DISPONIBLES[indiceBatallaActual];
    const resultado = batalla(jugador, enemigo);

    document.getElementById("contenedor-batallas").innerHTML = `
        <div class="producto">
            <img src="img/${jugador.avatar}" class="imgProducto">
            <p><b>${jugador.nombre}</b></p>
        </div>
        <div style="font-weight: bold; font-size: 2rem;">VS</div>
        <div class="producto">
            <img src="img/${enemigo.avatar}" class="imgProducto">
            <p><b>${enemigo.nombre}</b></p>
        </div>
    `;

    // Mostramos el resultado
    const resultadoDiv = document.getElementById("resultado-batallas");
    resultadoDiv.classList.remove("hidden");
    document.getElementById("recompensa-resultado").innerHTML = `
        <b>Ganador:</b> ${resultado.ganador} <br>
        <b>Puntos obtenidos:</b> +${resultado.puntos} pts
    `;

    const btn = document.getElementById("btn-ir-combate");
   
    btn.onclick = null; 

    if (indiceBatallaActual < ENEMIGOS_DISPONIBLES.length - 1) {
        btn.textContent = "Siguiente Batalla";
        btn.onclick = () => {
            indiceBatallaActual++;
            irABatalla(jugador);    
        };
    } else {
        btn.textContent = "ver resultado final";
        btn.onclick = () => {
            mostrarEscena7(jugador);
        };
    }

    mostrarEscena("escena-batallas");
}

