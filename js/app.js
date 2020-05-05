// Variables
const listaCursos = document.querySelector('#lista-carrito tbody');

const carrito = document.getElementById('carrito');

const cursos = document.getElementById('lista-cursos');

const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// Listeners
cargarEventsListeners();

function cargarEventsListeners() {

    // Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);

    // Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento, mostrar local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
};


// Funciones
// Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();

    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {

        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
};
// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> 
        <img src="${curso.imagen}">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td><a href="#" class="borrar-curso" data-id="${curso.id}">x</a></td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    let curso;
    let cursoId;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');

    }
    eliminarCursoLocalStorage(cursoId);
}

//Vaciar el carrito

function vaciarCarrito() {

    // opción no tan recomendada 
    //listaCursos.innerHTML = '';

    // opción recomendada 
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    //vaciar local storage
    vaciarLocalStorage();
    
    return false;
}

// Almacena cursos en el carrito a Local Storage

function guardarCursoLocalStorage(curso) {
    let cursos;

    // toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();

    // el curso seleccionado se agrega el arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;

    // Comprobamos si hay algo en logalStorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// Imprime los cursos de local storage en el carrito

function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso) {
        // construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> 
            <img src="${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}">x</a></td>
        `;
        listaCursos.appendChild(row);
    });
};

// eliminar curso por el id de local storage

function eliminarCursoLocalStorage(curso){
    let cursosLS;

    // obtenemos el arreglo de curos
    cursosLS = obtenerCursosLocalStorage();
    // iteramos comparando el id del curso borrando los del LS
    cursosLS.forEach(function(cursoLS, index){
        console.log(cursosLS, index)
        if (cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    });
    // Añadimos el arreglo actual a Local Storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
    console.log(cursosLS);
};

// elimina todos los cursos de local storage

function vaciarLocalStorage(){
    localStorage.clear();
}