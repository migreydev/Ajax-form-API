const ul = document.querySelector('ul');
const urlApi = 'http://localhost:3000/reservas';

async function getListado(){

    const respuesta = await fetch (urlApi);

    if(!respuesta.ok){
        console.error('Error al obtener una respuesta')
    }

    const listado = await respuesta.json();

    listado.forEach(element => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.innerText= "Ver Detalles";
        a.classList= "btn btn-primary";
        const saltoEspacio = document.createElement('br');
        ul.append(saltoEspacio);

        li.innerText  = `Id: ${element.id}, Fecha: ${element.fecha}, Espacio Reservado: ${element.espacio_reservado}, Nombre del solicitante: ${element.nombre_solicitante}`;

        li.append(a);
        ul.append(li);

        a.addEventListener('click', async() => {

            const id  = element.id;
            a.href = `./index.html?id=${id}`;
        })

        
    });

}

getListado();