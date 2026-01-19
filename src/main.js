/**
 * @file main.js
 * @description Punto de entrada principal del juego "Aventura en el Reino de JS".
 * Este módulo orquestra la validación del formulario inicial, la creación del jugador
 * y la navegación entre las diferentes escenas (Mercado, Estado, Enemigos y Batalla).
 */
import { mostrarEscena, mostrarJugador, mostrarMercado, mostrarEstadoActual, mostrarEscenaEnemigos } from "./modules/escenas.js";
import { Jugador } from "./modules/jugador.js";
// import { checkFullForm } from "./modules/registro.js";
import { irABatalla } from "./modules/escenas.js";
import { regexNombreJugador} from "./constants.js"; 
// import { guardarNombreEnCookie} from "./modules/registro.js";

/** * Referencia global al objeto del jugador creado tras el registro.
 * @type {Jugador|null} 
 */
let jugadorPrincipal = null;

// FUNCIÓN PARA VALIDAR EL FORMULARIO. ES EL PANEL DE CONTROL AL JUEGO

/**
 * Valida de forma integral el formulario de registro del jugador.
 * Actúa como el panel de control antes de permitir el acceso al juego.
 * * * Comprobaciones realizadas:
 * 1. Nombre: Debe cumplir con el formato {@link regexNombreJugador}.
 * 2. Vida: El valor mínimo obligatorio es 100.
 * 3. Reparto de puntos: La suma de ataque, defensa y vida no puede exceder 110.
 * 4. Valores negativos: No se permite ataque o defensa inferiores a 0.
 * * @function checkFullForm
 * @returns {boolean} True si todos los campos son válidos y el jugador puede crearse.
 */
function checkFullForm() {
    // Obtener los inputs
    const inputNombre = document.getElementById("nombre-jugador");
    
    const inputAtaque = document.getElementById("ataque");
    const inputDefensa = document.getElementById("defensa");
    const inputVida = document.getElementById("vida");

    // const inputPass = document.getElementById("password"); //CONTRASEÑA
    // const inputConfirmPass = document.getElementById("confirm-password");

    // Limpiar todos los mensajes previos
    document.querySelectorAll(".inputContainer small").forEach(s => s.textContent = "");

    let esValido = true;

    // VALIDACIÓN NOMBRE (Regex)
    if (!regexNombreJugador.test(inputNombre.value)) {
        inputNombre.nextElementSibling.textContent = "Empieza con Mayúscula (máx. 20 chars).";
        esValido = false;
    }

    // VALIDACIÓN CONTRASEÑA
    // if (inputPass.value.length < 6) {
    //     inputPass.nextElementSibling.textContent = "Mínimo 6 caracteres.";
    //     esValido = false;
    // }

    // // VALIDACIÓN COINCIDENCIA DE CONTRASEÑA
    // if (inputPass.value !== inputConfirmPass.value) {
    //     inputConfirmPass.nextElementSibling.textContent = "Las contraseñas no coinciden.";
    //     esValido = false;
    // }

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

/**
 * Evento para iniciar el juego. Valida el formulario, instancia al jugador principal
 * y muestra la tarjeta de personaje inicial.
 */
document.getElementById("btn-empezar").addEventListener("click", () => {
    
    if (checkFullForm()) { 
        const nombre = document.getElementById("nombre-jugador").value;
        // const password = document.getElementById("password").value; // CONTRASEÑA
        const ataque = parseInt(document.getElementById("ataque").value) || 0;
        const defensa = parseInt(document.getElementById("defensa").value) || 0;
        const vida = parseInt(document.getElementById("vida").value) || 100;


        // guardarNombreEnCookie(); //COOKIE

        // CREAR jugador principal
        jugadorPrincipal = new Jugador(nombre, ataque, defensa, vida);

        // Renderizar tarjeta
        mostrarJugador(jugadorPrincipal);

        // Cambiar escena
        mostrarEscena("escena-jugadora"); 
    }
});


// ESCENA 3: MERCADO

/**
 * Evento para acceder al mercado negro. Genera los productos y gestiona el monedero.
 */
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

/**
 * Evento para consultar las estadísticas actuales del jugador, incluyendo bonus de objetos.
 */
document.getElementById("btn-estado").addEventListener("click", () => {
    mostrarEstadoActual(jugadorPrincipal);
});

// ESCENA 5: ENEMIGOS

/**
 * Evento para mostrar el bestiario de enemigos disponibles en el reino.
 */
document.getElementById('btn-ir-enemigos').addEventListener('click', () => {
    mostrarEscenaEnemigos();
});

// ESCENA 6: BATALLAS

/**
 * Evento para iniciar la secuencia de combate final.
 */
document.getElementById('btn-ir-batallas').addEventListener('click', () => {
    irABatalla(jugadorPrincipal);
});


// ESCENA 0: BIENVENIDA
// document.addEventListener("DOMContentLoaded", () => {
//     // Iniciamos en la bienvenida
//     mostrarEscena("escena-bienvenida");
    
// });

// document.getElementById("btn-ir-al-registro").addEventListener("click", () => {
//     mostrarEscena("escena-formulario"); 
// });