
# ⚔️🐉 Aventura en el Reino de Dragones JS 🐉⚔️

**Aventura en el Reino de Dragones JS** es un juego de rol (RPG) basado en texto y menús interactivos, desarrollado íntegramente con **JavaScript**, **HTML** & **CSS**.
El proyecto está estructurado de forma modular para gestionar mecánicas complejas como batallas, comercio, gestión de inventario y progresión del personaje.

## 🚀 Características principales

* **Sistema de Combate:** Enfrentamientos contra enemigos y jefes finales con lógica de daño y recompensas.
* **Gestión de Jugador:** Sistema de niveles, experiencia, salud y oro.
* **Mercado Dinámico:** Compra y venta de productos (armas, armaduras, pociones) para mejorar las estadísticas del héroe.
* **Ranking:** Almacenamiento y visualización de las mejores puntuaciones.
* **Registro y Persistencia:** Sistema para dar de alta nuevos jugadores y mantener el progreso.
* **Modularidad:** Código organizado en módulos independientes para una mejor mantenibilidad (ES6 Modules).


## 📂 Estructura del Proyecto

El código se organiza de la siguiente manera:

* `index.html`: Punto de entrada de la interfaz de usuario.
* `style.css`: Estilos visuales del juego.
* `src/main.js`: Lógica de inicialización y control principal del flujo.
* `src/modules/`: Contiene la lógica central dividida por responsabilidades:
    * **jugador.js**: Estadísticas y acciones del héroe.
    * **batalla.js**: Control de los turnos y lógica de pelea.
    * **mercado.js**: Interfaz de la tienda y transacciones.
    * **enemigo.js / jefe.js**: Definición de oponentes.
    * **ranking.js**: Gestión de puntuaciones.


## 🛠️ Instalación y Uso

1.  **Clona** este repositorio o descarga los archivos.
2.  Dado que el proyecto utiliza módulos de JavaScript (`type="module"`), es necesario ejecutarlo a través de un **servidor local**.
3.  Abre el archivo `index.html` en tu navegador.


## 📋 Requisitos

* Un navegador web moderno (Chrome, Firefox, Edge, Safari) compatible con **ES6 Modules**.


## 📖 Documentación

El código incluye comentarios compatibles con **JSDoc** para generar documentación técnica detallada sobre las funciones y clases utilizadas.

