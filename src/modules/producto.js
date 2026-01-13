/**
 * @file producto.js
 * @description Define la clase Producto, que representa los objetos equipables del mercado con sus bonificadores y precios.
 */

/**
 * Clase que representa un producto o ítem del juego.
 * @class
 */

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
    
    /**
     * Crea una instancia de Producto.
     * @param {string} nombre - Nombre del producto.
     * @param {string} imagen - Nombre del archivo de imagen.
     * @param {number} precio - Coste en monedas.
     * @param {string} rareza - Rareza del ítem.
     * @param {string} tipo - Tipo de equipamiento.
     * @param {Object} bonus - Atributos que mejora el ítem.
     */
    constructor(nombre,imagen, precio, rareza, tipo, bonus) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.rareza = rareza;
        this.tipo = tipo;
        this.bonus = bonus;
        
    }

    /**
     * Formatea el precio para su visualización.
     * @type {string}
     * @readonly
     */
    get precioEuros() {
        return this.precio + "💰"; 
    }

    /**
     * Convierte el objeto de bonificadores en una cadena de texto legible para el usuario.
     * Recorre las claves del objeto bonus y concatena solo aquellas con valor positivo.
     * @method mostrarBonus
     * @returns {string} Texto formateado con los bonos (ej: "ataque +10, defensa +5").
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
     * Aplica un descuento al precio y genera una nueva instancia del producto.
     * El porcentaje se valida para que siempre esté en el rango de 0 a 100.
     * @method aplicarDescuento
     * @param {number} porcentajes - Porcentaje de rebaja a aplicar.
     * @returns {Producto} Una nueva instancia de Producto con el precio actualizado.
     */
    aplicarDescuento(porcentajes) {
    const porcentaje = Math.max(0, Math.min(100, porcentajes)); // Está entre 0 y 100
    const nuevoPrecio = Math.round(this.precio * (1 - porcentaje / 100));
    
    return new Producto(this.nombre, this.imagen, nuevoPrecio, this.rareza, this.tipo, this.bonus);
}

}