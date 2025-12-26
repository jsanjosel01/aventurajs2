import { mostrarEscena, mostrarJugador, mostrarMercado, mostrarEstadoActual, mostrarEscenaEnemigos } from "./modules/escenas.js";
import { Jugador } from "./modules/jugador.js";
import { checkFullForm } from "./modules/registro.js";
import { irABatalla } from "./modules/escenas.js";


let jugadorPrincipal = null;

document.getElementById("btn-empezar").addEventListener("click", () => {
    // Validar los datos del formulario 
    if (checkFullForm()) {
        const nombre = document.getElementById("nombre-jugador").value;
        const ataque = parseInt(document.getElementById("ataque").value) || 0;
        const defensa = parseInt(document.getElementById("defensa").value) || 0;
        const vida = parseInt(document.getElementById("vida").value) || 100;

        // Crear la instancia del jugador
        jugadorPrincipal = new Jugador(nombre, ataque, defensa, vida);

        // Renderizar la tarjeta del jugador 
        mostrarJugador(jugadorPrincipal);

        // Cambiar la vista de la Escena 1 a la Escena 2
        mostrarEscena("escena-jugadora");
    }
});

// ESCENA 3: MERCADO
document.getElementById("btn-mercado").addEventListener("click", () => {
    
    // Cambiar a la escena 3
    mostrarEscena("escena-mercado");

    try {
        if (jugadorPrincipal) {
            mostrarMercado(jugadorPrincipal);
        }
    } catch (error) {
        console.error("Error en el mercado negro:", error);
    }
});

// ESCENA 4: ESTADO ACTUAL
document.getElementById("btn-estado").addEventListener("click", () => {
    mostrarEstadoActual(jugadorPrincipal);
});

// ESCENA 5: ENEMIGOS
document.getElementById('btn-ir-enemigos').addEventListener('click', () => {
    mostrarEscenaEnemigos();
});

// ESCENA 6: BATALLAS
document.getElementById('btn-ir-batallas').addEventListener('click', () => {
    irABatalla(jugadorPrincipal);
});