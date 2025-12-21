import { Enemigo } from "./enemigo.js";


/**
 * Clase Jefe
 * Extiende de Enemigo y añade un multiplicador para los puntos de recompensa.
 */
export class Jefe extends Enemigo {
    /**
     * @param {string} nombre - Nombre del jefe.
     * @param {number} ataque - Nivel de ataque base.
     * @param {string} avatar - Ruta de la imagen.
     * @param {number} [multiplicadorDmg=1.2] - Multiplicador para los puntos al derrotarlo.
     */
    constructor(nombre, ataque, avatar, multiplicadorDmg = 1.2) {
        // Llamamos al constructor de Enemigo
        super(nombre, ataque, avatar);
        
        this.tipo = 'Jefe';
        this.multiplicadorDmg = multiplicadorDmg;
    }

    /**
     * Calcula los puntos obtenidos al derrotar al jefe.
     * Fórmula: (100 + ataque) * multiplicadorDmg
     * @returns {number} Puntos totales de recompensa.
     */
    calcularPuntosVictoria() {
        const puntosBase = 100 + this.ataque;
        return Math.floor(puntosBase * this.multiplicadorDmg);
    }

    /**
     * Muestra la información del jefe.
     */
    mostrarEnemigo() {
        return `💀 ${this.nombre} (JEFE) - Ataque: ${this.ataque} | Multiplicador: x${this.multiplicadorDmg}`;
    }
}