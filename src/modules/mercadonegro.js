/**
 * @file mercadonegro.js
 * @description Módulo que carga los productos creados por el usuario desde localStorage
 * y los convierte en objetos Producto para mostrarlos en el mercado del juego.
 */
import { Producto } from "./producto.js";

const CLAVE_STORAGE = "productos_julia";

/**
 * Carga los productos guardados en localStorage y los convierte en instancias de Producto.
 * @function cargarProductosUsuario
 * @returns {Array<Producto>} Array de productos creados por el usuario.
 */
export function cargarProductosUsuario() {
    const productosGuardados = JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];

    return productosGuardados.map(item => {
        // Convertir el bonus string (+12) a un objeto según el tipo
        const valorBonus = parseInt(item.bonus.replace("+", "")) || 0;
        let bonusObj = {};

        if (item.tipo === "Arma") {
            bonusObj = { ataque: valorBonus };
        } else if (item.tipo === "Armadura") {
            bonusObj = { defensa: valorBonus };
        } else {
            bonusObj = { vida: valorBonus };
        }

        return new Producto(
            item.nombre,
            item.imagen || "default.png",
            item.precio,
            item.rareza.toLowerCase(),
            item.tipo.toLowerCase(),
            bonusObj
        );
    });
}
