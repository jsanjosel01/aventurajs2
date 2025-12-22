// import { EUR } from '../constants.js';

// PRODUCTO

/**
 * Clase Producto
 */
export class Producto {
    nombre;
    imagen;
    precio;
    rareza;
    tipo;
    bonus;
    
    // Constructor 
    constructor(nombre,imagen, precio, rareza, tipo, bonus) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.rareza = rareza;
        this.tipo = tipo;
        this.bonus = bonus;
        
    }

    /**
     * Formatea el precio.
     */
    get precioEuros() {
        return this.precio + "💰"; 
    }

    /**
     * Convierte el objeto bonus en un string legible.
     */
    mostrarBonus() {
        let bonusStr = '';
        for (const clave in this.bonus) {
            if (this.bonus[clave] > 0) {
                bonusStr += `${clave} +${this.bonus[clave]}, `;
            }
        }
        return bonusStr.slice(0, -2); // Elimina la última coma
    }

    /**
     * Aplica un descuento al producto y devuelve una nueva instancia con el precio actualizado.
     * @param {number} porcentaje - Porcentaje de descuento (0–100).
     * @returns {Producto} Un nuevo producto con el precio reducido.
     */

    aplicarDescuento(porcentajes) {
    const porcentaje = Math.max(0, Math.min(100, porcentajes)); // Está entre 0 y 100
    const nuevoPrecio = Math.round(this.precio * (1 - porcentaje / 100));
    
    return new Producto(this.nombre, this.imagen, nuevoPrecio, this.rareza, this.tipo, this.bonus);
}

}