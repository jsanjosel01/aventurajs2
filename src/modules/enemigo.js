

/**
 * Clase Enemigo
 */

export class Enemigo {
    tipo;
    nombre;
    ataque;
    vidaMax;
    vida;
    avatar;

    constructor(nombre, ataque, avatar) {
        this.tipo = 'Enemigo';
        this.nombre = nombre;
        this.ataque = ataque;
        this.vidaMax = VIDA_MAX_ENEMIGO;
        this.vida = this.vidaMax;
        this.avatar = avatar;
    }

    // Calcula puntos: 100 base + ataque
    obtenerPuntosRecompensa() {
        return 100 + this.ataque;
    }

    mostrarEnemigo() {
        return `😈 ${this.nombre} (Tipo: ${this.tipo}, Ataque: ${this.ataque}, Vida: ${this.vida})`;
    }
}
