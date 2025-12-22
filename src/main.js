import { mostrarEscena, mostrarJugador } from "./modules/escenas.js";
import { Jugador } from "./modules/jugador.js";
import { checkFullForm } from "./modules/registro.js";

document.getElementById("btn-empezar").addEventListener("click", () => {
    // Validar los datos del formulario 
    if (checkFullForm()) {
        const nombre = document.getElementById("nombre-jugador").value;
        const ataque = parseInt(document.getElementById("ataque").value) || 0;
        const defensa = parseInt(document.getElementById("defensa").value) || 0;
        const vida = parseInt(document.getElementById("vida").value) || 100;

        // Crear la instancia del jugador
        const nuevoJugador = new Jugador(nombre, ataque, defensa, vida);

        // Renderizar la tarjeta del jugador 
        mostrarJugador(nuevoJugador);

        // Cambiar la vista de la Escena 1 a la Escena 2
        mostrarEscena("escena-jugadora");
    }
});