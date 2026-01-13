/**
 * @file jugador.js
 * @description Define la clase Jugador, gestionando sus estadísticas, inventario y progresión.
 */
import { AVATAR_JUGADOR, VIDA_MAX_JUGADOR } from "../constants.js";

/**
 * Clase que representa al protagonista de la aventura.
 * @class
 */
export class Jugador {
    nombre;
    puntos;
    inventario;
    vida;
    avatar;
    dinero;

    /**
     * Crea una instancia de Jugador.
     * @param {string} nombre - Nombre elegido por el usuario.
     * @param {number} [ataque=0] - Puntos de ataque iniciales.
     * @param {number} [defensa=0] - Puntos de defensa iniciales.
     * @param {number} [vida=100] - Puntos de salud iniciales.
     */
    constructor(nombre, ataque = 0, defensa = 0, vida = 100) {
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        this.puntos = 0;
        this.dinero = 500;
        this.inventario = [];
        this.vida = vida;
        this.avatar = AVATAR_JUGADOR;
    }

    /**
     * Añade un producto al inventario realizando una copia profunda, CLONARLOS.
     * @method añadirProducto
     * @param {Object} producto - El objeto del producto a añadir.
     */
    añadirProducto(producto) {
        this.inventario.push(structuredClone(producto));

    }
    /**
     * Calcula el ataque total sumando el base y los bonos de los objetos del inventario.
     * @type {number}
     * @readonly
     */
    get ataqueTotal() {
        let total = this.ataque;
        this.inventario.forEach(producto => {
            if (producto.bonus.ataque > 0 && producto.bonus.ataque != null) {
                total += producto.bonus.ataque;
            }
        });
        return total;
    }

    /**
     * Calcula la defensa total sumando la base y los bonos de los objetos del inventario.
     * @type {number}
     * @readonly
     */
    get defensaTotal() {
        let total = this.defensa;
        this.inventario.forEach(producto => {
            if (producto.bonus.defensa > 0 && producto.bonus.defensa != null) {
                total += producto.bonus.defensa;
            }
        });
        return total;
    }

   /**
     * Calcula la vida total sumando la base y los bonos de los objetos del inventario.
     * @type {number}
     * @readonly
     */
    get vidaTotal() {
        let total = this.vida;
        this.inventario.forEach(producto => {
            if (producto.bonus.vida > 0 && producto.bonus.vida != null) {
                total += producto.bonus.vida;
            }
        });
        return total;
    }

    /**
     * Actualiza el estado del jugador tras una victoria.
     * Aumenta los puntos y cura una cantidad fija de vida sin exceder el máximo.
     * @method ganarBatalla
     * @param {number} puntos - Puntos obtenidos en el combate.
     */
    ganarBatalla(puntos) {
        this.puntos += puntos;
        this.vida += 200;
        if (this.vida > VIDA_MAX_JUGADOR) this.vida = VIDA_MAX_JUGADOR;
    }

    /**
     * Genera una cadena de texto con la presentación detallada del estado del jugador.
     * @method presentarJugador
     * @returns {string} Descripción formateada para mostrar en consola o UI.
     */
    presentarJugador() {
        return `
      👤 ${this.nombre}
      ❤️ Vida: ${this.vida}/${this.vidaMax}
      ⭐ Puntos: ${this.puntos}
      ⚔️ Ataque total: ${this.ataqueTotal}
      🛡️ Defensa total: ${this.defensaTotal}
      🎒 Inventario: ${this.inventario.length > 0
                ? this.inventario.map(item => item.nombre).join(', ')
                : 'Vacío'}
    `;
    }

}