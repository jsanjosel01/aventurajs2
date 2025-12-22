import { regexNombreJugador } from "../constants.js";

/**
 * Valida el nombre del jugador comparándolo con la expresión regular.
 * @returns {boolean} True si es válido, False si no.
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
 * Valida que los puntos de estadísticas sean coherentes.
 * (Por ejemplo, que no sean negativos o que sumen un máximo).
 * @returns {boolean}
 */
export function validarCantidadTotal() {
    const ataque = parseInt(document.getElementById("ataque").value) || 0;
    const defensa = parseInt(document.getElementById("defensa").value) || 0;
    const vida = parseInt(document.getElementById("vida").value) || 0;

    // Validación básica: que no haya valores negativos
    if (ataque < 0 || defensa < 0 || vida < 100) {
        return false;
    }

    return true;
}

/**
 * Ejecuta todas las validaciones antes de permitir el envío del formulario.
 */
export function checkFullForm() {
    const esNombreValido = validarNombre();
    const sonStatsValidos = validarCantidadTotal();

    return esNombreValido && sonStatsValidos;
}