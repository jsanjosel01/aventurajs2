/**
 * @file constants.js
 * @description Configuración global, constantes de balance y base de datos de objetos y enemigos del juego.
 * @module Constants
 */
import { Producto } from "./modules/producto.js";
import { Enemigo } from "./modules/enemigo.js";
import { Jefe } from "./modules/jefe.js";



// CONFIGURACIÓN MONEDA
/** * Configurador de formato para moneda local (Euro).
 * @type {Intl.NumberFormat} 
 */
export const EUR = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
});

export const AVATAR_JUGADOR = "as2.jpg";
export const INVENTARIO_TAMANIO  = 6;

// LÍMITES DE ESTADÍSTICAS
export const VIDA_MAX_JUGADOR = 500;
export const VIDA_MAX_ENEMIGO = 200;
export const PUNTOS_BASE_VICTORIA = 100;
export const MULTIPLICADOR_JEFE_DEFECTO = 1.25;

// FORMULARIO - EXPRESIONES REGULARES 

/** * Expresión regular para validar el nombre del jugador.
 * Debe empezar con mayúscula y tener entre 1 y 20 caracteres alfabéticos o espacios.
 * @type {RegExp} 
 */
export const regexNombreJugador = /^[A-Z][a-zA-Z\s]{0,19}$/;
export const NOMBRE_INCORRECTO = "Sólo letras y espacios en blanco, tiene que empezar por mayúsculas. (Máx. 20 carácteres)";


// MERCADO DE PRODUCTOS

/** * Base de datos de productos disponibles en el mercado.
 * Contiene armas, armaduras y consumibles con sus respectivos bonificadores.
 * @type {Array<Producto>} 
 */
export const PRODUCTOS_MERCADO = [
    // Formato: Nombre, Imagen, Precio (céntimos), Rareza, Tipo, Bonus (objeto)
    new Producto("Flecha", "flecha.png", 200, "rara", "arma", { ataque: 25 }),
    new Producto("Hacha", "hacha.png", 90, "legendaria", "arma", { ataque: 40 }),
    new Producto("Escudo", "escudo.png", 100, "comun", "armadura", { defensa: 25 }),
    new Producto("Casco", "casco.png", 80, "rara", "armadura", { defensa: 20 }),
    new Producto("Fruto de Dragón", "fruta.png", 50, "comun", "consumible", { vida: 20 }),
    new Producto("Poción", "pocion.png", 80, "legendaria", "consumible", { vida: 60 })
];

// LISTADO DE ENEMIGOS
/** * Listado de oponentes para la fase de batalla.
 * Incluye enemigos estándar y jefes con multiplicadores de dificultad.
 * @type {Array<Enemigo|Jefe>} 
 */
export const ENEMIGOS_DISPONIBLES = [
    // Enemigo: Nombre, Ataque, Imagen, Vida
    new Enemigo("Fireworn", 4, "d3.jpg", 6),
    new Enemigo("Sreaming Death", 5, "d4.jpg", 4),
    
    // Jefe: Nombre, Ataque, Imagen, Vida, Multiplicador
    new Jefe("Death song", 7, "d2.jpg", 7, 1.5),
    new Jefe("Hideous Zippleback", 7, "d8.jpg", 8, 2.0)
];