// Cambio de escenas

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


