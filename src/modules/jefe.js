/**
 * @file jefe.js
 * @description Define la clase Jefe, una especialización de la clase Enemigo con bonificadores de puntuación.
 */
import { Enemigo } from "./enemigo.js";


/**
 * Clase que representa a un Jefe de nivel.
 * Extiende las funcionalidades básicas de un {@link Enemigo} añadiendo multiplicadores de recompensa.
 * @class
 * @extends Enemigo
 */
export class Jefe extends Enemigo {
   /**
     * Crea una instancia de Jefe.
     * @param {string} nombre - Nombre del jefe.
     * @param {number} ataque - Nivel de ataque base.
     * @param {string} avatar - Ruta o nombre del archivo de imagen.
     * @param {number} [multiplicadorDmg=1.2] - Multiplicador opcional para los puntos de recompensa (por defecto 1.2).
     */
    constructor(nombre, ataque, avatar, multiplicadorDmg = 1.2) {
        // Llamamos al constructor de Enemigo
        super(nombre, ataque, avatar);
        
        /** @type {string} Sobrescribe el tipo heredado a 'Jefe' */
        this.tipo = 'Jefe';
        this.multiplicadorDmg = multiplicadorDmg;
    }

    /**
     * Calcula los puntos de victoria específicos para el jefe.
     * Aplica el multiplicador de daño sobre la base de (100 + ataque).
     * @method calcularPuntosVictoria
     * @returns {number} Puntos totales de recompensa redondeados hacia abajo.
     */
    calcularPuntosVictoria() {
        const puntosBase = 100 + this.ataque;
        return Math.floor(puntosBase * this.multiplicadorDmg);
    }

    /**
     * Devuelve una cadena de texto formateada con la información del jefe.
     * Incluye iconos distintivos y el valor del multiplicador.
     * @method mostrarEnemigo
     * @override
     * @returns {string} Resumen de estadísticas del jefe.
     */
    mostrarEnemigo() {
        return `💀 ${this.nombre} (JEFE) - Ataque: ${this.ataque} | Multiplicador: x${this.multiplicadorDmg}`;
    }
}