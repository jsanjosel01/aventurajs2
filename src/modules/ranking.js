/**
 * Decide el nivel del jugador y lanza el confetti.
 * @param {Object} jugador - Jugador participante.
 * @param {number} [umbral=250] - Puntos mínimos para ser "pro", por defecto 300.
 * @returns {string} Nivel del jugador.
 */
export function calcularNivel(jugador, umbral = 300) {
    animarVictoria(); //Llamar animación confetti

    const total = jugador.puntos + jugador.dinero;
    return total >= umbral ? "VETERANO" : "NOVATO";
}

// CONFETTI
function animarVictoria() { 
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}