
import { Producto } from "./modules/producto.js";
import { Enemigo } from "./modules/enemigo.js";
import { Jefe } from "./modules/jefe.js";

/**
 * Configuración global y base de datos del juego.
 */

// CONFIGURACIÓN MONEDA
export const EUR = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
});

export const AVATAR_JUGADOR = "astrid.png";
export const INVENTARIO_TAMANIO  = 6;

// LÍMITES DE ESTADÍSTICAS
export const VIDA_MAX_JUGADOR = 500;
export const VIDA_MAX_ENEMIGO = 200;
export const PUNTOS_BASE_VICTORIA = 100;
export const MULTIPLICADOR_JEFE_DEFECTO = 1.25;

// FORMULARIO - EXPRESIONES REGULARES 
export const regexNombreJugador = /^[A-Z][A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,19}$/;
export const NOMBRE_INCORRECTO = "Sólo letras y espacios en blanco, tiene que empezar por mayúsculas. (Máx. 20 carácteres)";

// MERCADO DE PRODUCTOS
export const PRODUCTOS_MERCADO = [
    // Formato: Nombre, Imagen, Precio (céntimos), Rareza, Tipo, Bonus (objeto)
    new Producto("Flecha", "flecha.png", 100, "rara", "arma", { ataque: 25 }),
    new Producto("Hacha", "hacha.png", 90, "legendaria", "arma", { ataque: 40 }),
    new Producto("Escudo", "escudo.png", 100, "comun", "armadura", { defensa: 25 }),
    new Producto("Casco", "casco.png", 10, "rara", "armadura", { defensa: 20 }),
    new Producto("Fruto de Dragón", "fruta.png", 50, "comun", "consumible", { vida: 20 }),
    new Producto("Poción", "pocion.png", 80, "legendaria", "consumible", { vida: 60 })
];

// LISTADO DE ENEMIGOS
export const ENEMIGOS_DISPONIBLES = [
    // Enemigo: Nombre, Ataque, Imagen, Vida
    new Enemigo("Fireworn", 4, "d3.jpg", 20),
    new Enemigo("Sreaming Death", 7, "d4.jpg", 8),
    
    // Jefe: Nombre, Ataque, Imagen, Vida, Multiplicador
    new Jefe("Death song", 10, "d2.jpg", 80, 1.5),
    new Jefe("Hideous Zippleback", 15, "d8.jpg", 100, 2.0)
];