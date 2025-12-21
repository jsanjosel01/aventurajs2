

// Clase Jugador

export class Jugador {
    nombre;
    puntos;
    inventario;
    vida;
    avatar;
    dinero;

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

    // Añadir productos, clonarlos.
    añadirProducto(producto) {
        this.inventario.push(structuredClone(producto));

    }

    // GETS
    get ataqueTotal() {
        let total = this.ataque;
        this.inventario.forEach(producto => {
            if (producto.bonus.ataque > 0 && producto.bonus.ataque != null) {
                total += producto.bonus.ataque;
            }
        });
        return total;
    }

    
    get defensaTotal() {
        let total = this.defensa;
        this.inventario.forEach(producto => {
            if (producto.bonus.defensa > 0 && producto.bonus.defensa != null) {
                total += producto.bonus.defensa;
            }
        });
        return total;
    }

   
    get vidaTotal() {
        let total = this.vida;
        this.inventario.forEach(producto => {
            if (producto.bonus.vida > 0 && producto.bonus.vida != null) {
                total += producto.bonus.vida;
            }
        });
        return total;
    }

    // Suma los puntos, tras ganar batalla
    ganarBatalla(puntos) {
        this.puntos += puntos;
        this.vida += 200;
        if (this.vida > VIDA_MAX_JUGADOR) this.vida = VIDA_MAX_JUGADOR;
    }

    /**
    * Devuelve una presentación detallada del jugador.
    * @returns {Object} Descripción formateada del jugador.
    */
    mostrarJugador() {
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