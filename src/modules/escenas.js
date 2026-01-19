/**
 * @file escenas.js
 * @description Módulo encargado de la navegación entre pantallas, renderizado de la interfaz 
 * y gestión visual del progreso del jugador (mercado, batallas y ranking).
 * @module Escenas
 */
import { rarezaRandom, descuentoRandom, aplicarDescuentoPorRareza, actualizarInventario } from "./mercado.js";

import { ENEMIGOS_DISPONIBLES } from "../constants.js";
import { batalla } from "./batalla.js";
import { calcularNivel } from "./ranking.js";



/** @type {number} Índice que rastrea el progreso actual en la lista de enemigos */
// Inicar las batallas a 0

let indiceBatallaActual = 0;

/**
 * Gestiona el cambio de escenas ocultando todos los contenedores con la clase '.scene' 
 * y mostrando el ID proporcionado.
 * @function mostrarEscena
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
 * Renderiza la tarjeta informativa inicial del jugador.
 * @function mostrarJugador
 * @param {Object} jugador - Instancia del jugador con datos de avatar, nombre y estadísticas.
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
        <div class="stat-item">⭐ Puntos: ${Math.floor(jugador.puntos)}</div>
    `;

}
// ESCENA MERCADO

/**
 * Genera y muestra la interfaz del mercado con productos aleatorios y lógica de compra/venta.
 * @function mostrarMercado
 * @param {Object} jugador - El objeto del jugador para gestionar su dinero e inventario.
 */

// Funcion para mostrar el mercado
export function mostrarMercado(jugador) {
    const mercadoDiv = document.getElementById("mercado");
    const pDinero = document.getElementById("dinero");
    const casillasFooter = document.querySelectorAll("#inventory-container .item");

    // MONEDERO
    const actualizarTextoDinero = () => {
    const spanMonedero = document.getElementById("dinero-enmonedero");
    
    if (spanMonedero) {
        spanMonedero.innerText = `${jugador.dinero}$`;
    }
    
    // Guardamos en localStorage
    localStorage.setItem("datos_jugador", JSON.stringify(jugador));
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

        botonAccion.addEventListener("click", (e) => {
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

                // ANIMACIÓN CARRITO: Solo si la compra es exitosa
                dispararAnimacionCarrito(e);

                jugador.dinero -= producto.precio;
                jugador.inventario.push(producto);
                
                botonAccion.textContent = "Retirar";
                // botonAccion.classList.add("boton-retirar");
                productoDiv.classList.add("comprado");
            } else {
                
                // Devolver producto
                jugador.dinero += producto.precio;
                jugador.inventario.splice(indiceEnInventario, 1);
                
                botonAccion.textContent = "Añadir";
                productoDiv.classList.remove("comprado");
            }
            actualizarTextoDinero();
            actualizarInventario(casillasFooter, jugador.inventario);
        });

        productoDiv.appendChild(botonAccion);
        mercadoDiv.appendChild(productoDiv);
    });
}

// Funcion para Animación carrito
function dispararAnimacionCarrito(evento) {
    const icono = document.createElement("div");
    icono.innerText = "🛒";
    icono.className = "animacion-carrito";
    
    // Posicionar el icono donde se hizo clic
    icono.style.left = `${evento.pageX}px`;
    icono.style.top = `${evento.pageY}px`;
    
    document.body.appendChild(icono);
    
    // Eliminar el elemento del DOM tras terminar la animación
    setTimeout(() => {
        icono.remove();
    }, 2000);
}


/**
 * Muestra el estado final y actualizado del jugador antes de las batallas.
 * @function mostrarEstadoActual
 * @param {Object} jugador - El objeto del jugador con estadísticas acumuladas.
 */

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
        <div class="stat-item">⭐ Puntos Totales: ${Math.floor(jugador.puntos)}</div>
    `;

    // Cambiamos a la escena 4
    mostrarEscena("escena-estado-actual");
}

/**
 * Renderiza la galería de enemigos disponibles configurados en las constantes.
 * @function mostrarEscenaEnemigos
 */

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


// ESCENA 6 - IR A BATALLAS

/**
 * Ejecuta la lógica de combate visual y funcional entre el jugador y el enemigo actual.
 * Incluye animaciones de monedas y gestión de flujo de combate múltiple.
 * @function irABatalla
 * @param {Object} jugador - El objeto del jugador actual.
 */

export function irABatalla(jugador) {
    const enemigo = ENEMIGOS_DISPONIBLES[indiceBatallaActual];
    const resultado = batalla(jugador, enemigo);

    document.getElementById("contenedor-batallas").innerHTML = `
        <div class="producto animar-prota">
            <img src="img/${jugador.avatar}" class="imgProducto">
            <p><b>${jugador.nombre}</b></p>
        </div>
        <div style="font-weight: bold; font-size: 2rem;">VS</div>
        <div class="producto animar-enemigo">
            <img src="img/${enemigo.avatar}" class="imgProducto">
            <p><b>${enemigo.nombre}</b></p>
        </div>
    `;

    // LÓGICA DE MONEDAS (Solo si gana el jugador)
    if (resultado.ganador === jugador.nombre) {
        let htmlMonedas = `
           <div class="moneda" style="left: 25vw;"><img src="img/moneda.png"></div>
            <div class="moneda" style="left: 50vw;"><img src="img/moneda.png"></div>
            <div class="moneda" style="left: 75vw;"><img src="img/moneda.png"></div>
        `;

        document.body.insertAdjacentHTML('beforeend', htmlMonedas);

        // Limpiamos las monedas del body cuando acabe la animación
        setTimeout(() => {
            document.querySelectorAll('.moneda-animada').forEach(m => m.remove());
        }, 3000);
    }

    // Mostramos el resultado
    const resultadoDiv = document.getElementById("resultado-batallas");
    resultadoDiv.classList.remove("hidden");
    document.getElementById("recompensa-resultado").innerHTML = `
        <b>Ganador:</b> ${resultado.ganador} <br>
        <b>Puntos obtenidos:</b> +${Math.floor(resultado.puntos)}
    `;

    const btn = document.getElementById("btn-ir-combate");
    btn.onclick = null; 

    if (indiceBatallaActual < ENEMIGOS_DISPONIBLES.length - 1) {
        btn.textContent = "Luchar";
        btn.onclick = () => {
            indiceBatallaActual++;
            irABatalla(jugador);
        };
    } else {
        btn.textContent = "Finalizar combates";
        btn.onclick = () => {
            irAResultadoFinal(jugador); 
        };
    }

    mostrarEscena("escena-batallas");
}

// ESCENA 7 - RESULTADOS

/**
 * Muestra la pantalla de resultados finales, calculando el rango del jugador y sus puntos totales.
 * @function irAResultadoFinal
 * @param {Object} jugador - El objeto del jugador con los puntos y dinero finales.
 */
export function irAResultadoFinal(jugador) {
    const contenedor = document.getElementById("contenedor-resultado-final");
    
    if (contenedor) {
        // Calculamos el rango (Novato o Veterano)
        const nivel = calcularNivel(jugador, 300);
        
        // Calculamos los puntos totales (Batalla + Monedas)
        const puntosTotales = jugador.puntos + jugador.dinero;
        
        // Imprimimos el resultado
        contenedor.innerHTML = `
            <h3>${nivel}</h3>
            <p>Puntos totales: ${puntosTotales}</p>
        `;
    }

    // Configuración del botón para pasar a la tabla de clasificación (Escena 8)
    const btnRanking = document.getElementById("btn-ir-ranking");
    if (btnRanking) {
        btnRanking.onclick = () => {
            irAClasificacion(jugador);
        };
    }
    
    mostrarEscena("escena-resultados");
}

// ESCENA 8 - RANKING

/**
 * Gestiona el ranking histórico guardado en LocalStorage y muestra la tabla de clasificación.
 * @function irAClasificacion
 * @param {Object} jugador - El objeto del jugador para ser registrado en el ranking.
 */
export function irAClasificacion(jugador) {
    const contenedor = document.getElementById("contenedor-clasificacion");
    
    // Registro del jugador actual
    const nuevoRegistro = {
        nombre: jugador.nombre,
        puntos: jugador.puntos,
        dinero: jugador.dinero
        // objetos: jugador.inventario.map(item => item.nombre)
    };

    // Recuperar ranking del LocalStorage
    let rankings = JSON.parse(localStorage.getItem("ranking_jugadores")) || [];
    
    
    // Si está vacío, rellenamos con Enemigos para tener scroll
    if (rankings.length === 0) {
        for (let i = 1; i <= 10; i++) {
            rankings.push({ 
                nombre: `Enemigo`, 
                puntos: 50 * i, 
                dinero: i * 5
                // objetos: [] 
            });
        }
    }

    // Añadir el jugador y guardar
    rankings.push(nuevoRegistro);

    // OPCIONAL: Ordenar por puntos de mayor a menor
    rankings.sort((a, b) => b.puntos - a.puntos);
    
    localStorage.setItem("ranking_jugadores", JSON.stringify(rankings));


    // Tabla 
    if (contenedor) {
        contenedor.innerHTML = `
            <div class="tabla-contenedor">
                <table class="ranking-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Puntos</th>
                            <th>Dinero</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        ${rankings.map(reg => `
                            <tr>
                                <td>${reg.nombre}</td>
                                <td>${Math.floor(reg.puntos)}</td>
                                <td>${reg.dinero}</td>
                                
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // <td>${reg.objetos && reg.objetos.length > 0 
    //     ? reg.objetos.join(', ') 
    //     : ''}</td>

    

    // Botón para mostrar ranking por consola
    const btnConsola = document.getElementById("btn-ranking-consola");
    if (btnConsola) {
        btnConsola.onclick = () => {
            // Recuperamos los datos actualizados de LocalStorage
            const rankingHistorico = JSON.parse(localStorage.getItem("ranking_jugadores")) || [];

            console.log("Ranking de jugadores: ");
            console.table(rankingHistorico); 
        };
    }

    // Botón reiniciar juego
    const btnReiniciar = document.getElementById("btn-reiniciar");
    if (btnReiniciar) {
        btnReiniciar.onclick = () => location.reload();
    }

    mostrarEscena("escena-clasificacion");

    // FORZAR CENTRAR TABLA:
    const escena = document.getElementById("escena-clasificacion");
    if (escena) {
        escena.style.display = "flex"; 
    }
}