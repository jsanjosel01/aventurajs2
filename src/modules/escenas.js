/**
 * Gestiona el cambio de escenas ocultando todas y mostrando la deseada.
 * @param {string} idEscena - El ID del contenedor HTML de la escena a mostrar.
 */
export function mostrarEscena(idEscena) {
    // Selecciona todos los elementos con la clase 'scene' y los oculta 
    const escenas = document.querySelectorAll('.scene');
    escenas.forEach(escena => {
        escena.style.display = 'none'; 
    });

    // Muestra la escena específica 
    const escenaActiva = document.getElementById(idEscena);
    if (escenaActiva) {
        escenaActiva.style.display = 'block';
    }
}

/**
 * Renderiza la tarjeta informativa del jugador con sus estadísticas iniciales.
 * @param {Jugador} jugador - Instancia de la clase Jugador con los datos.
 */
export function mostrarJugador(jugador) {
    const contenedorStats = document.getElementById("stat-box");
    const contenedorProtagonista = document.querySelector(".protagonista");

    // Insertar la imagen y nombre en la zona del avatar [cite: 51, 52]
    contenedorProtagonista.innerHTML = `
        <img src="img/${jugador.avatar}" alt="Avatar de ${jugador.nombre}" id="avatar-img">
        <p><b>${jugador.nombre}</b></p>
    `;

    // Insertar las estadísticas
    contenedorStats.innerHTML = `
        <div class="stat-item"><b>Ataque:</b> ${jugador.ataque}</div>
        <div class="stat-item"><b>Defensa:</b> ${jugador.defensa}</div>
        <div class="stat-item"><b>Vida:</b> ${jugador.vida}</div>
        <div class="stat-item"><b>Puntos:</b> ${jugador.puntos}</div>
    `;

   
}