// Cambio de escenas

/**
 * @file scenes.js
 * @description Módulo para la gestión de la visibilidad de las interfaces del juego.
 */

/**
 * Gestiona el cambio de escenas en el DOM.
 * * Esta función realiza dos pasos:
 * 1. Busca todos los elementos con la clase '.scene' y les quita la clase 'hidden' 
 * (haciéndolos visibles si la clase CSS 'hidden' aplica display: none).
 * 2. Busca un elemento específico por su ID y le añade la clase 'hidden' 
 * (ocultándolo).
 * * @function showScene
 * @param {string} id - El identificador único (ID) del elemento HTML que se desea procesar.
 */

// Funcion buscamos todas las escenas y les quitamos la clase que las hace visibles
export function showScene(id) {
    document.querySelectorAll('.scene').forEach(element => {
        element.classList.remove('hidden');
    });

    // Buscamos la escena por ID y le añadimos la clase que la muestra
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('hidden');
    }
}


