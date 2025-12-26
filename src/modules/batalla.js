import { Jefe } from "./jefe.js";
import { PUNTOS_BASE_VICTORIA } from "../constants.js";

/**
 * Simula una batalla por turnos y gestiona recompensas (Puntos y Monedas)
 */
export function batalla(jugador, enemigo) {
    let vidaJugador = jugador.vida;
    let vidaEnemigo = enemigo.vida;

    const dmgJugador = jugador.ataque;
    const dmgEnemigo = enemigo.ataque;
    const defensaJugador = jugador.defensa;

    //combate
    while (vidaJugador > 0 && vidaEnemigo > 0) {
        const turno = Math.floor(Math.random() * 2);
        if (turno === 0) {
            vidaEnemigo -= dmgJugador;
        } else {
            // El daño recibido se mitiga con la defensa
            const dañoReal = Math.max(0, dmgEnemigo - defensaJugador);
            vidaJugador -= dañoReal;
        }
    }

    let ganaJugador = false;
    let puntosGanados = 0;
    let monedasGanadas = 0;

    // LÓGICA DE VICTORIA Y RECOMPENSAS 
    if (vidaJugador > 0 && vidaEnemigo <= 0) {
        ganaJugador = true;
        
        // Cálculo de Puntos
        puntosGanados = PUNTOS_BASE_VICTORIA + dmgEnemigo;
        if (enemigo instanceof Jefe) {
            puntosGanados = enemigo.multiplicarDmg(puntosGanados);
        }

        // Cálculo de Monedas (Requisito: 5 normal / 10 jefe)
        monedasGanadas = (enemigo instanceof Jefe) ? 10 : 5;

        // Actualizar Jugador
        jugador.puntos += puntosGanados;
        jugador.dinero += monedasGanadas;
        
    }

    return {
        ganador: ganaJugador ? jugador.nombre : enemigo.nombre,
        puntos: puntosGanados,
        monedas: monedasGanadas,
        mensaje: `Ganador: ${ganaJugador ? jugador.nombre : enemigo.nombre}, Puntos: +${puntosGanados} pts, Oro: +${monedasGanadas} 💰`
    };
}

// FUNCIONES DE ANIMACIÓN
export async function desactivarPelea() {
    const pelea = document.querySelector('.pelea');
    if (pelea && pelea.classList.contains('activa')) {
        pelea.classList.remove('activa');
        await new Promise(resolve => setTimeout(resolve, 100)); 
    }
}

export function iniciarPelea() {
    const pelea = document.querySelector('.pelea');
    if (pelea) pelea.classList.add('activa');
}

/**
 * Requisito: Sumar monedas restantes a la puntuación final
 */
export function obtenerPuntuacionFinal(jugador) {
    return jugador.puntos + jugador.dinero;
}