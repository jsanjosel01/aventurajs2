import { Jefe } from "./jefe.js";
import { PUNTOS_BASE_VICTORIA } from "../constants.js";

/**
 * Simula una batalla por turnos y gestiona recompensas (Puntos y Monedas)
 */

export function batalla(jugador, enemigo) {
    let vidaJugador = jugador.vida;
    let vidaEnemigo = enemigo.vida;

    while (vidaJugador > 0 && vidaEnemigo > 0) {
        // Ataque del jugador
        vidaEnemigo -= jugador.ataque;
        if (vidaEnemigo <= 0) break;

        // Ataque del enemigo (Fórmula: Vida = vida + defensa - ataque)
        const dañoReal = enemigo.ataque - jugador.defensa;
        vidaJugador -= Math.max(0, dañoReal); 
    }

    if (vidaJugador > 0) {
        // RECOMPENSAS
        let puntosGanados = 100 + enemigo.ataque;
        let monedasGanadas = 5;

        // Si es jefe (comprobamos por tipo o propiedad)
        if (enemigo.tipo === 'Jefe') {
            puntosGanados *= enemigo.multiplicadorDmg; // Usamos la propiedad directamente
            monedasGanadas = 10;
        }

        // Actualizamos al jugador
        jugador.puntos += puntosGanados;
        jugador.dinero += monedasGanadas;

        return {
            ganador: jugador.nombre,
            puntos: puntosGanados,
            monedas: monedasGanadas
        };
    }

    return { ganador: enemigo.nombre, puntos: 0, monedas: 0 };
}

// Funcion suma extra de dinero
export function obtenerPuntuacionFinal(jugador) {
    return jugador.puntos + jugador.dinero;
}