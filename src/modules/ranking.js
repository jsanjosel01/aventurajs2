/**
 * @file ranking.js
 * @description Módulo encargado de calcular el rango final del jugador y gestionar las celebraciones visuales.
 * @module Ranking
 */


/**
 * Decide el nivel del jugador basándose en su rendimiento final y lanza una animación de celebración.
 * * El cálculo suma los puntos de victoria y el dinero restante. Si el total supera el umbral,
 * el jugador es considerado "VETERANO", de lo contrario será un "NOVATO".
 * * @function calcularNivel
 * @param {Object} jugador - Instancia del jugador con sus estadísticas acumuladas.
 * @param {number} [umbral=300] - Puntos mínimos necesarios para alcanzar el rango Veterano (por defecto 300).
 * @returns {string} Etiqueta del nivel alcanzado: "VETERANO" o "NOVATO".
 */
export function calcularNivel(jugador, umbral = 300) {
    animarVictoria(); //Llamar animación confetti

    const total = jugador.puntos + jugador.dinero;
    return total >= umbral ? "VETERANO" : "NOVATO";
}

// CONFETTI
/**
 * Dispara una animación de confeti en pantalla utilizando la librería externa canvas-confetti.
 * Configura la cantidad de partículas, la dispersión y el origen de la explosión.
 * * @function animarVictoria
 * @private
 */
function animarVictoria() { 
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}