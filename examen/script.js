
import { regexNombreObjeto } from "../script";


let nuevoObjeto = null;

//  FORMULARIO

document.getElementById("btn-añadir").addEventListener("click", () => {
    
    if (checkFullForm()) { 
        const nombre = document.getElementById("nombre-objeto").value;
        const precio = parseInt(document.getElementById("precio-productos").value) || 99;
        const rareza = parseInt(document.getElementById("rareza").value);
        const tipo = parseInt(document.getElementById("tipo-armas").value);
        const bonus = document.getElementById("bonus").value;
        const imagen = document.getElementById("imagenes").value;


        // Crear objeto nuevo
        nuevoObjeto = new Objeto(nombre, precio, rareza, tipo, bonus, imagen);

        // Renderizar tarjeta
        mostrarObjeto(nuevoObjeto);

        
    }
});


// Validación

export function checkFullForm() {
    // Obtener los inputs
    const inputNombre = document.getElementById("nombre-objeto");
    const inputPrecio = document.getElementById("precio-productos");
    const inputRareza = document.getElementById("rareza");
    const inputtipo = document.getElementById("tipo-armas");
    const inputbonus = document.getElementById("bonus");
    const inputimagen = document.getElementById("imagenes");


    // Limpiar todos los mensajes previos
    document.querySelectorAll(".inputContainer small").forEach(s => s.textContent = "");

    let esValido = true;

    // VALIDACIÓN NOMBRE (Regex)
    if (!regexNombreObjeto.test(inputNombre.value)) {
        inputNombre.nextElementSibling.textContent = "Empieza con Mayúscula.";
        esValido = false;
    }

    // Convertir a números para lógica
    const pre = parseInt(inputPrecio.value) || 0;

    return esValido;
}





// LOCALSTORAGE
export function irAproductosguardados(objeto) {
    const contenedor = document.getElementById("contenedor-almacen");
    
    // Registro del almacén
    const RegistroObjeto = {
        nombre: objeto.nombre,
        precio: objeto.precio,
        rareza: objeto.rareza,
        tipo: objeto.tipo,
        bonus: objeto.bonus,
        imagen: objeto.imagen
        
    };

    // Recuperar ranking del LocalStorage
    let rankingsalmacen = JSON.parse(localStorage.getItem("almacen_ranking")) || [];
    

    // Añadir el jugador y guardar
    rankingsalmacen.push(RegistroObjeto);
    
    localStorage.setItem("almacen_ranking", JSON.stringify(rankings));


    if (contenedor) {
        contenedor.innerHTML = `
            <div class="objetos">
                <p>nombre: </p>
                <p>precio: </p>
                <p>tipo: </p>
                <p>bonus: </p>
                <p>imagen: </p>
            </div>
        `;
    }

   
    // Botón para mostrar almacen por consola
    const btnConsola = document.getElementById("btn-almacen");
    if (btnConsola) {
        btnConsola.onclick = () => {
            // Recuperamos los datos actualizados de LocalStorage
            const rankingHistoricoAlmacen = JSON.parse(localStorage.getItem("almacen_ranking")) || [];

            console.log("Almacen: ");
            console.log(rankingHistoricoAlmacen); 
        };
    }

}


