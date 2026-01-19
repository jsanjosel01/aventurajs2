/**
 * @file registro.js
 * @description Módulo encargado de la validación del formulario de registro.
 * Controla los requisitos de nombre y el reparto de puntos de estadísticas.
 * @module Registro
 */
import { regexNombreJugador } from "../constants.js";



/**
 * Valida el nombre del jugador comparándolo con una expresión regular.
 * * Requisitos:
 * 1. Debe coincidir con la Regex (Empezar por mayúscula, máx 20 caracteres).
 * 2. Proporciona feedback visual cambiando el color del borde y mostrando mensajes en el tag <small>.
 * * @function validarNombre
 * @returns {boolean} True si el nombre cumple con el formato, False en caso contrario.
 */
export function validarNombre() {
    const inputNombre = document.getElementById("nombre-jugador");
    const nombre = inputNombre.value.trim();
    const contenedor = inputNombre.parentElement;
    const small = contenedor.querySelector("small");

    if (regexNombreJugador.test(nombre)) {
        inputNombre.style.borderColor = "green";
        if (small) small.innerText = "";
        return true;
    } else {
        inputNombre.style.borderColor = "red";
        if (small) {
            small.innerText = "Empieza con Mayúscula. Máx 20 letras.";
            small.style.color = "red";
        }
        return false;
    }
}

/**
 * Valida que los puntos de estadísticas (Ataque, Defensa, Vida) sean coherentes 
 * con las reglas del juego.
 * * Reglas de negocio:
 * 1. Ataque y Defensa deben ser >= 0.
 * 2. La Vida no puede ser inferior a 100.
 * 3. La suma total no puede exceder los 110 puntos (10 puntos extra sobre la vida base).
 * * @function validarCantidadTotal
 * @returns {boolean} True si las estadísticas son legales.
 */
export function validarCantidadTotal() {
    const inputAtaque = document.getElementById("ataque");
    const inputDefensa = document.getElementById("defensa");
    const inputVida = document.getElementById("vida");

    const ataque = parseInt(inputAtaque.value) || 0;
    const defensa = parseInt(inputDefensa.value) || 0;
    const vida = parseInt(inputVida.value) || 0;

    const sumaTotal = ataque + defensa + vida;
    const MAX_TOTAL = 110;

    // REQUISITOS DEL ENUNCIADO:
    const ataqueValido = ataque >= 0;
    const defensaValido = defensa >= 0;
    const vidaValida = vida >= 100; // Nunca inferior a 100
    const sumaValida = sumaTotal <= MAX_TOTAL; // No más de 110 (reparto de 10 puntos)

    const statsCorrectos = ataqueValido && defensaValido && vidaValida && sumaValida;

    // Feedback visual
    const color = statsCorrectos ? "green" : "red";
    [inputAtaque, inputDefensa, inputVida].forEach(input => {
        input.style.borderColor = color;
    });

    return statsCorrectos;
}

/**
 * Realiza una comprobación integral del formulario y gestiona el estado del botón de inicio.
 * Invoca las validaciones de nombre y estadísticas para habilitar o deshabilitar 
 * el elemento con ID "btn-empezar".
 * * @function checkFullForm
 * @returns {boolean} Resultado global de la validación del formulario.
 */
export function checkFullForm() {
    const esNombreValido = validarNombre();
    const sonStatsValidos = validarCantidadTotal();

    const btnEmpezar = document.getElementById("btn-empezar");
    if (btnEmpezar) {
        btnEmpezar.disabled = !(esNombreValido && sonStatsValidos);
    }

    return esNombreValido && sonStatsValidos;
}


// COOKIE

// /**
//  * Guarda una cookie en el navegador.
//  * @param {string} nombre - El nombre de la cookie.
//  * @param {string} valor - El valor a guardar.
//  * @param {number} dias - Días hasta que expire.
//  */
// function establecerCookie(nombre, valor, dias) {
//     const d = new Date();
//     d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = nombre + "=" + valor + ";" + expires + ";path=/";
// }

// /**
//  * Guarda el nombre actual del input en una cookie.
//  * Se debe llamar cuando el usuario pulse el botón de empezar.
//  */
// export function guardarNombreEnCookie() {
//     const inputNombre = document.getElementById("nombre-jugador");
//     const nombre = inputNombre.value.trim();
    
//     if (nombre) {
//         establecerCookie("nombreJugador", nombre, 7); // Guardamos por 7 días
//         console.log("Cookie guardada: " + nombre);
//     }
// }
