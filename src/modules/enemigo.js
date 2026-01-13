import { VIDA_MAX_ENEMIGO } from "../constants.js";

/**
 * @file enemigo.js
 * @description Define la clase base para los oponentes del juego.
 */

/**
 * Clase que representa a un enemigo estándar.
 * @class
 */
export class Enemigo {
    tipo;
    nombre;
    ataque;
    vidaMax;
    vida;
    avatar;

    /**
     * Crea una instancia de Enemigo.
     * @param {string} nombre - Nombre del oponente.
     * @param {number} ataque - Fuerza de ataque base.
     * @param {string} avatar - Ruta o nombre de la imagen.
     */
    constructor(nombre, ataque, avatar) {
        this.tipo = 'Enemigo';
        this.nombre = nombre;
        this.ataque = ataque;
        this.vidaMax = VIDA_MAX_ENEMIGO;
        this.vida = this.vidaMax;
        this.avatar = avatar;
    }

    /**
     * Calcula los puntos de recompensa al derrotar al enemigo.
     * La recompensa base es de 100 puntos sumados a su estadística de ataque.
     * @method obtenerPuntosRecompensa
     * @returns {number} Puntos totales de recompensa.
     */

    // Calcula puntos: 100 base + ataque
    obtenerPuntosRecompensa() {
        return 100 + this.ataque;
    }

    /**
     * Devuelve una cadena de texto formateada con la información del enemigo.
     * Utilizado para depuración o visualización rápida en consola/UI.
     * @method mostrarEnemigo
     * @returns {string} Información detallada del enemigo.
     */
    mostrarEnemigo() {
        return `😈 ${this.nombre} (Tipo: ${this.tipo}, Ataque: ${this.ataque}, Vida: ${this.vida})`;
    }
}
