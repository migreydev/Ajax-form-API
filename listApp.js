const ul = document.querySelector('ul');
const urlApi = 'http://localhost:3000/reservas';

//Funcion para listar los elementos de la API
async function getListado(){

    const respuesta = await fetch (urlApi);

    if(!respuesta.ok){
        console.error('Error al obtener una respuesta')
    }

    const listado = await respuesta.json();

    listado.forEach(element => {
        const li = document.createElement('li');

        //Se crea una etique "a" que enviara al usuario a la edicion del objeto
        const a = document.createElement('a');
        a.innerText= "Ver Detalles";
        a.classList= "btn btn-primary";
        const saltoEspacio = document.createElement('br');
        ul.append(saltoEspacio);

        //Muestra el listado de elementos 
        li.innerText  = `Id: ${element.id}, Fecha: ${element.fecha}, Espacio Reservado: ${element.espacio_reservado}, Nombre del solicitante: ${element.nombre_solicitante}`;

        li.append(a);
        ul.append(li);

        //La etiqueta a se le añadira un evento 
        a.addEventListener('click', async() => {

            const id  = element.id;
            a.href = `./index.html?id=${id}`;
        })

        
    });

}

getListado();