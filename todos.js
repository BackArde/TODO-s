document.addEventListener("DOMContentLoaded", function () {
  // Selectores
  var agregar = document.querySelector("form button");
  var seleccion = document.querySelector('#lista');

  agregar.addEventListener("click", addTarea);
  seleccion.addEventListener('click', filtroTareas);
  obtenerTareas();
});

/* Funciones */

// Añadir la tarea.
function addTarea(event) {
  event.preventDefault();
  var newDiv = document.createElement("div");
  newDiv.classList.add("tarea");

  // Elemento de lista.
  var li = document.createElement("li");
  li.classList.add("nuevaTarea");


  var finalizada = document.createElement("button");
  finalizada.innerHTML = '<i class="fas fa-check"></i>';
  finalizada.classList.add("completada");
  finalizada.addEventListener("click", completarTarea);

  var borrar = document.createElement("button");
  borrar.innerHTML = '<i class="fas fa-trash-alt"></i>';
  borrar.classList.add("eliminar");
  borrar.addEventListener("click", eliminarTarea);


  var contenedor = document.querySelector(".listaTareas");
  var texto = document.getElementById("tarea");

  li.innerHTML = texto.value;
  newDiv.appendChild(li);
  newDiv.appendChild(finalizada);
  newDiv.appendChild(borrar);
  contenedor.appendChild(newDiv);

  
  guardarTarea(texto.value);
  texto.value = "";
}


function completarTarea(event) {
  event.preventDefault();
  this.parentElement.classList.add("tareaCompletada");
}


function eliminarTarea(event) {
  event.preventDefault();
  this.parentElement.classList.add("tareaEliminada");
  this.parentElement.addEventListener("transitionend", function () {
      this.remove();
    });
}


function guardarTarea(tarea){
    var todasLasTareas;

    if (localStorage.getItem('listaDeTareas') == null){
        todasLasTareas = [];
    }else{
        todasLasTareas = JSON.parse(localStorage.getItem('listaDeTareas'));
    }
    todasLasTareas.push(tarea);
    localStorage.setItem('listaDeTareas', JSON.stringify(todasLasTareas));
}


function obtenerTareas(){
  var todasLasTareas;

  if(localStorage.getItem('listaDeTareas') == null){
    todasLasTareas = [];
  } else{
    todasLasTareas = JSON.parse(localStorage.getItem('listaDeTareas'));
  }

  
  todasLasTareas.forEach(tarea =>{
    var newDiv = document.createElement("div");
    newDiv.classList.add("tarea");

    var li = document.createElement("li");
    li.classList.add("nuevaTarea");

    
    var finalizada = document.createElement("button");
    finalizada.innerHTML = '<i class="fas fa-check"></i>';
    finalizada.classList.add("completada");
    finalizada.addEventListener("click", completarTarea);

    var borrar = document.createElement("button");
    borrar.innerHTML = '<i class="fas fa-trash-alt"></i>';
    borrar.classList.add("eliminar");
    borrar.addEventListener("click", eliminarTarea);

    var contenedor = document.querySelector(".listaTareas");

    li.innerHTML = tarea;
    newDiv.appendChild(li);
    newDiv.appendChild(finalizada);
    newDiv.appendChild(borrar);
    contenedor.appendChild(newDiv);
    
  });
}

function filtroTareas(){
    var tareas = document.querySelectorAll('.tarea');

    tareas.forEach(tarea => {
        switch(this.value){
            case 'todas':
                tarea.style.display = 'flex';
                break;
            case 'finalizadas':
                if (tarea.classList.contains('tareaCompletada')){
                    tarea.style.display = 'flex';
                } else{
                    tarea.style.display = 'none';
                }
                break;
            case 'pendientes': 
                if (!tarea.classList.contains('tareaCompletada')){
                    tarea.style.display = 'flex';
                } else{
                    tarea.style.display = 'none';
                }
                break;
        }
    });
}

function comprobarVacio() {
  var input = document.querySelector(".tarea");
  var vacio;
  if (input.value == "") {
    vacio = true;
  } else {
    vacio = false;
  }

  return vacio;
}
