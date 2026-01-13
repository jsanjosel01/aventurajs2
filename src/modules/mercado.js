/**
 * @file mercado.js
 * @description Módulo que gestiona la lógica del mercado negro: generación de descuentos, 
 * filtrado por rareza y sincronización visual del inventario.
 * @module Mercado
 */
import { PRODUCTOS_MERCADO } from "../constants.js";


/**
 * Filtra un array de productos según su nivel de rareza.
 * @function filtrarPorRarezaMercado
 * @param {Array<Object>} mercado - Lista de productos a filtrar.
 * @param {string} [rarezaFiltro=""] - Rareza buscada ("comun", "raro", "epico"). 
 * Si está vacío, devuelve el mercado completo.
 * @returns {Array<Object>} Array filtrado de productos.
 */
export function filtrarPorRarezaMercado(mercado, rarezaFiltro = "") {
    return rarezaFiltro === "" 
        ? mercado 
        : mercado.filter(producto => producto.rareza === rarezaFiltro);
}

/**
 * Genera un porcentaje de descuento aleatorio en pasos de 10.
 * @function descuentoRandom
 * @returns {number} Valor entre 10 y 100 (múltiplo de 10).
 */
export function descuentoRandom() {
    return (Math.floor(Math.random() * 10) + 1) * 10;
};

/**
 * Selecciona una rareza de forma aleatoria.
 * @function rarezaRandom
 * @returns {string} Una de las siguientes: "comun", "raro" o "epico".
 */
export function rarezaRandom() {
    const rarezas = ["comun", "raro", "epico"];
    return rarezas[Math.floor(Math.random() * rarezas.length)];
};

/**
 * Crea una nueva lista de productos aplicando un descuento a aquellos que coincidan con la rareza especificada.
 * @function aplicarDescuentoPorRareza
 * @param {string} rareza - La rareza a la que se aplicará la rebaja.
 * @param {number} porcentaje - Porcentaje de descuento (0-100).
 * @returns {Array<Object>} Nuevo array con los objetos de producto actualizados.
 */
export function aplicarDescuentoPorRareza(rareza, porcentaje) {
    return PRODUCTOS_MERCADO.map(producto =>
        producto.rareza === rareza 
            ? producto.aplicarDescuento(porcentaje) 
            : producto
    );
}

/**
 * Busca un producto específico dentro del mercado utilizando su nombre.
 * @function buscarProductoPorNombre
 * @param {Array<Object>} mercado - Array de productos donde buscar.
 * @param {string} nombre - Nombre del producto (insensible a mayúsculas).
 * @returns {Object|undefined} El producto encontrado o undefined si no existe.
 */
export function buscarProductoPorNombre(mercado, nombre) {
    return mercado.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

/**
 * Actualiza la representación visual del inventario en el footer del juego.
 * @function actualizarInventario
 * @param {NodeList|Array<HTMLElement>} items - Los elementos del DOM (huecos) donde se pintarán las imágenes.
 * @param {Array<Object>} arrayInventario - Lista de productos que posee el jugador actualmente.
 */
export function actualizarInventario(items, arrayInventario) {
    items.forEach((hueco, i) => {
        hueco.innerHTML = ""; 
        const producto = arrayInventario[i];
        if (producto) {
            const img = document.createElement("img");
            img.src = "img/" + producto.imagen; 
            img.title = producto.nombre + ": " + producto.mostrarBonus();
            hueco.appendChild(img);
        }
    });
}