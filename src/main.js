import { mostrarEscena, mostrarJugador, mostrarMercado, mostrarEstadoActual, mostrarEscenaEnemigos } from "./modules/escenas.js";
import { Jugador } from "./modules/jugador.js";
// import { checkFullForm } from "./modules/registro.js";
import { irABatalla } from "./modules/escenas.js";

import { regexNombreJugador} from "./constants.js"; 


let jugadorPrincipal = null;

// FUNCIÓN PARA VALIDAR EL FORMULARIO. ES EL PANEL DE CONTROL AL JUEGO
function checkFullForm() {
    // Obtener los inputs
    const inputNombre = document.getElementById("nombre-jugador");
    const inputAtaque = document.getElementById("ataque");
    const inputDefensa = document.getElementById("defensa");
    const inputVida = document.getElementById("vida");

    // Limpiar todos los mensajes previos
    document.querySelectorAll(".inputContainer small").forEach(s => s.textContent = "");

    let esValido = true;

    // VALIDACIÓN NOMBRE (Regex)
    if (!regexNombreJugador.test(inputNombre.value)) {
        inputNombre.nextElementSibling.textContent = "Empieza con Mayúscula (máx. 20 chars).";
        esValido = false;
    }

    // Convertir a números para lógica
    const atk = parseInt(inputAtaque.value) || 0;
    const def = parseInt(inputDefensa.value) || 0;
    const vit = parseInt(inputVida.value) || 0;

    // VALIDACIÓN VIDA MÍNIMA
    if (vit < 100) {
        inputVida.nextElementSibling.textContent = "La vida mínima es 100.";
        esValido = false;
    }

    // VALIDACIÓN REPARTO DE PUNTOS (Suma <= 110)
    const total = atk + def + vit;
    if (total > 110) {
        inputVida.nextElementSibling.textContent = `Puntos excedidos: ${total}/110. Solo tienes 10 extras.`;
        esValido = false;
    }

    // VALIDACIÓN NEGATIVOS
    if (atk < 0 || def < 0) {
        if (atk < 0) inputAtaque.nextElementSibling.textContent = "No puede ser negativo.";
        if (def < 0) inputDefensa.nextElementSibling.textContent = "No puede ser negativo.";
        esValido = false;
    }

    return esValido;
}

// ESCENA 1: FORMULARIO
document.getElementById("btn-empezar").addEventListener("click", () => {
    
    if (checkFullForm()) { 
        const nombre = document.getElementById("nombre-jugador").value;
        const ataque = parseInt(document.getElementById("ataque").value) || 0;
        const defensa = parseInt(document.getElementById("defensa").value) || 0;
        const vida = parseInt(document.getElementById("vida").value) || 100;

        // jugador principal
        jugadorPrincipal = new Jugador(nombre, ataque, defensa, vida);

        // Renderizar tarjeta
        mostrarJugador(jugadorPrincipal);

        // Cambiar escena
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