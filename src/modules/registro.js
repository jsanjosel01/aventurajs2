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
 * Comprueba todo el formulario para habilitar el botón "Empezar"
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