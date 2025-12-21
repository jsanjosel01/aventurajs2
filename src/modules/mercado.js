
// MERCADO

/**
 * Filtra un array de productos por rareza.
 */
export function filtrarPorRarezaMercado(mercado, rarezaFiltro = "") {
    return rarezaFiltro === "" 
        ? mercado 
        : mercado.filter(producto => producto.rareza === rarezaFiltro);
}

/**
 * Genera un porcentaje de descuento aleatorio (10, 20, ..., 100).
 */
export function descuentoRandom() {
    return (Math.floor(Math.random() * 10) + 1) * 10;
};

/**
 * Genera una rareza aleatoria de producto.
 */
export function rarezaRandom() {
    const rarezas = ["comun", "raro", "epico"];
    return rarezas[Math.floor(Math.random() * rarezas.length)];
};

/**
 * Aplica descuento sobre el precio original según la rareza.
 * Devuelve un nuevo array (gracias al .map) con los productos rebajados.
 */
export function aplicarDescuentoPorRareza(rareza, porcentaje) {
    return PRODUCTOS_MERCADO.map(producto =>
        producto.rareza === rareza 
            ? producto.aplicarDescuento(porcentaje) 
            : producto
    );
}

/**
 * Busca un producto por su nombre.
 */
export function buscarProductoPorNombre(mercado, nombre) {
    return mercado.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

/**
 * Actualiza visualmente las casillas del inventario en el DOM.
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