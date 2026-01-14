/**
 * @file batalla.js
 * @description Módulo encargado de la lógica de combate por turnos y la gestión de recompensas.
 */
import { Jefe } from "./jefe.js";
import { PUNTOS_BASE_VICTORIA } from "../constants.js";


/**
 * Simula una batalla por turnos entre el jugador y un enemigo.
 * * El flujo del combate sigue estas reglas:
 * 1. El jugador ataca primero (daño mínimo de 1).
 * 2. Si el enemigo sobrevive, ataca al jugador restando la defensa de este.
 * 3. Si el jugador gana, recibe puntos basados en el ataque del enemigo y monedas.
 * 4. Si el enemigo es de tipo 'Jefe', se aplican multiplicadores de daño y mayores recompensas.
 * 5. Los datos actualizados del jugador se guardan en el LocalStorage.
 * * @function batalla
 * @param {Object} jugador - Instancia del jugador con sus estadísticas (vida, ataque, defensa, puntos, dinero).
 * @param {Object} enemigo - Instancia del enemigo u objeto con sus estadísticas.
 * @returns {Object} Resultado del combate: { ganador: string, puntos: number, monedas: number }.
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

/**
 * Calcula la puntuación final del jugador para el ranking.
 * Suma los puntos acumulados en batallas y el dinero restante.
 * * @function obtenerPuntuacionFinal
 * @param {Object} jugador - El objeto del jugador actual.
 * @returns {number} La suma total de puntos y dinero.
 */

// FUNCION EXTRA DE DINERO
export function obtenerPuntuacionFinal(jugador) {
    return jugador.puntos + jugador.dinero;
}
