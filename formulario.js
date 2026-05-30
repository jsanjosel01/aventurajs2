
const CLAVE_STORAGE = "productos_julia";

const formulario = document.getElementById("formulario-item");

formulario.addEventListener("submit", function (e) {
    // Evitar que la página se recargue
    e.preventDefault();

    // Capturar los valores introducidos por el usuario
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseInt(document.getElementById("precio").value, 10);
    const rareza = document.getElementById("rareza").value;
    const tipo = document.getElementById("tipo").value;
    const bonus = document.getElementById("bonus").value.trim();

    // Imagen: solo guardamos el nombre del archivo
    const inputImagen = document.getElementById("imagen");
    const archivo = inputImagen.files[0];
    const nombreImagen = archivo ? archivo.name : "";

    // Crear un objeto JavaScript con la información
    const nuevoItem = {
        nombre: nombre,
        precio: precio,
        rareza: rareza,
        tipo: tipo,
        bonus: bonus,
        imagen: nombreImagen,
        fecha: new Date().toLocaleString()
    };

    // Guardar en LocalStorage 
    let productos = JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
    productos.push(nuevoItem);
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));

    // Reiniciar los valores
    formulario.reset();

    alert("¡Se ha guardado correctamente!");
});
