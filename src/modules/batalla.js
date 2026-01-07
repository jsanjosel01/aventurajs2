import { Jefe } from "./jefe.js";
import { PUNTOS_BASE_VICTORIA } from "../constants.js";

/**
 * Simula una batalla por turnos y gestiona recompensas (Puntos y Monedas)
 */

export function batalla(jugador, enemigo) {
    let vidaJugador = jugador.vida;
    let vidaEnemigo = enemigo.vida;

    while (vidaJugador > 0 && vidaEnemigo > 0) {
        // ATAQUE JUGADOR: Math.max(1,...) evita que el programa se bloquee si el ataque es 0
        vidaEnemigo -= Math.max(1, jugador.ataque);
        if (vidaEnemigo <= 0) break;

        // ATAQUE ENEMIGO
        const dañoReal = enemigo.ataque - jugador.defensa;
        vidaJugador -= Math.max(0, dañoReal); 
    }

    if (vidaJugador > 0) {
        let puntosGanados = 100 + enemigo.ataque;
        let monedasGanadas = 5;

        if (enemigo.tipo === 'Jefe') {
            puntosGanados *= enemigo.multiplicadorDmg;
            monedasGanadas = 10;
        }

        puntosGanados = Math.floor(puntosGanados);

        // Actualizamos las propiedades reales de tu jugador
        jugador.puntos += puntosGanados;
        jugador.dinero += monedasGanadas;

        localStorage.setItem("datos_jugador", JSON.stringify(jugador));
        
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
