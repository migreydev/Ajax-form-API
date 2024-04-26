const urlEspacios = 'https://intranetjacaranda.es/pruebaJS/espacios.php';
const urlApi = 'http://localhost:3000/reservas';

const formulario = document.querySelector('form');
const fecha = document.getElementById('fecha');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono =  document.getElementById('telefono');
const espacio = document.getElementById('espacio');
const descripcion = document.getElementById('descripcion');
const botonReservar = document.getElementById('submit');

const urlEditar = window.location.search;
const parametro =  new URLSearchParams(urlEditar);
const id = parametro.get('id');

if(id){
    const h2 = document.querySelector('h2');
    h2.innerText = 'Editar Reserva de Espacios'

    botonReservar.innerText = "Editar reserva";
    botonReservar.classList= "btn btn-warning";

    const ultimoDiv = document.getElementById('ultimoDiv');

    const div = document.createElement('div');
    div.id='nuevoDiv';
    div.classList = 'mb-3';
    ultimoDiv.appendChild(div);

    const label = document.createElement('label');
    label.innerText = 'Estado'
    label.classList= 'form-label';
    const nuevoDiv = document.getElementById('nuevoDiv');
    nuevoDiv.append(label);

    const estado = document.createElement('select');
    estado.classList= "form-control";

    const option = document.createElement('option');
    option.textContent="Pendiente";

    const optionAprobada = document.createElement('option');
    optionAprobada.textContent="Aprobada";

    const optionRechazada = document.createElement('option');
    optionRechazada.textContent="Rechazada";

    estado.append(option);
    estado.append(optionAprobada);
    estado.append(optionRechazada);
    nuevoDiv.append(estado);

    async function getReservas(){

        const respuesta = await fetch (urlApi);

        if(!respuesta.ok){
            console.error('Error al obtener la respuesta')
        }

        const reservas = await respuesta.json();

        reservas.forEach(reserva =>{

            if(id === reserva.id){

                fecha.value = reserva.fecha;
                fecha.readOnly = true;

                nombre.value = reserva.nombre_solicitante;
                nombre.readOnly = true;

                email.value = reserva.email_solicitante;
                email.readOnly=true;

                telefono.value = reserva.telefono_contacto;
                telefono.readOnly=true;

                espacio.textContent = reserva.espacio_reservado;
                descripcion.value = reserva.descripcion;
                estado.value = reserva.estado;
            }
        })
    }

    getReservas();

    botonReservar.addEventListener('click', async(e) =>{
        e.preventDefault();
        isValidDescription = false;

    
        if(validateDescription(descripcion.value)){
            isValidDescription = true;
    
            if(isValidDescription){
                const success = document.getElementById('smallDescripcion');
                success.className = "";
                success.innerText = "";
            }
    
        }else {
            const error = document.getElementById('smallDescripcion');
            error.className = 'text-danger';
            error.innerText = "Error, el campo descripcion debe tener mínimo 20 caracteres";
        }
    
        const valorEspacio = espacio.selectedOptions[0].textContent;

        if(isValidDescription){

            const urlEditar = `${urlApi}/${id}`;
            const respuesta = await fetch (urlEditar,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fecha: fecha.value,
                    nombre_solicitante: nombre.value,
                    email_solicitante: email.value,
                    telefono_contacto: telefono.value,
                    espacio_reservado: valorEspacio,
                    descripcion: descripcion.value,
                    estado: estado.value,
                })
            });
        
            if(!respuesta.ok){
                console.error('Error al editar la reserva');
            }else {
                window.location.href = 'list.html';
            }
        }
    })

}else {

    botonReservar.addEventListener('click', async (e) => {
    
        e.preventDefault();
        isValidDate = false;
        isValidEmail = false;
        isValidPhone = false;
        isValidDescription = false;
        
        if(validateDate(fecha.value)){
            isValidDate = true;
    
            if(isValidDate){
                const success = document.getElementById('smallFecha');
                success.className = "";
                success.innerText = "";
            }
    
        }else {
            const error = document.getElementById('smallFecha');
            error.className = 'text-danger';
            error.innerText = "Error, la fecha no puede ser posterior al día actual";
        }
    
        if(validateEmail(email.value)){
            isValidEmail = true;
    
            if(isValidEmail){
                const success = document.getElementById('smallEmail');
                success.className = "";
                success.innerText = "";
            }
    
        }else {
            const error = document.getElementById('smallEmail');
            error.className = 'text-danger';
            error.innerText = "Error, el correo electronico debe ser valido";
        }
    
        if(validatePhone(telefono.value)){
            isValidPhone = true;
    
            if(isValidPhone){
                const success = document.getElementById('smallTelefono');
                success.className = "";
                success.innerText = "";
            }
    
        }else {
            const error = document.getElementById('smallTelefono');
            error.className = 'text-danger';
            error.innerText = "Error, el numero de telefono debe ser valido";
        }
    
        if(validateDescription(descripcion.value)){
            isValidDescription = true;
    
            if(isValidDescription){
                const success = document.getElementById('smallDescripcion');
                success.className = "";
                success.innerText = "";
            }
    
        }else {
            const error = document.getElementById('smallDescripcion');
            error.className = 'text-danger';
            error.innerText = "Error, el campo descripcion debe tener mínimo 20 caracteres";
        }
    
        const valorEspacio = espacio.selectedOptions[0].textContent;
    
        if( isValidDate && isValidEmail && isValidPhone && isValidDescription){
    
            const respuesta = await fetch (urlApi,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fecha: fecha.value,
                    nombre_solicitante: nombre.value,
                    email_solicitante: email.value,
                    telefono_contacto: telefono.value,
                    espacio_reservado: valorEspacio,
                    descripcion: descripcion.value,
                    estado: "Pendiente"
                })
            });
        
            if(!respuesta.ok){
                console.error('Error al añadir la reserva');
            }else {
                window.location.href = 'list.html';
            }
        }
    })
}


function validateDate(date){
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(date);
    isValid = false;

    if(fechaSeleccionada <= fechaActual ) {
        isValid = true;
    }
    return isValid;
}

function validateEmail(email){
    isValid = false;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email.length > 0){
        
        if(regexEmail.test(email)) {
                isValid = true;
        }
    }
    return isValid;
}

function validatePhone(phone){
    const regexTelefono = /^\d{9}$/;
    isValid = false;

    if(phone > 0){
    
        if(regexTelefono.test(phone)){
            isValid = true;
        }
    }
    return isValid;
}

async function getEspacios() {

    const respuesta = await fetch(urlEspacios);

    if (!respuesta.ok) {
        console.error('Error al obtener una respuesta');
        return;
    }

    const xml = await respuesta.text();
    const responseXml = new DOMParser().parseFromString(xml, 'text/xml')

    const espacios = responseXml.querySelectorAll('espacio');

    espacios.forEach(data =>{
        const nombre = data.querySelector('nombre').textContent;
        const id = data.querySelector('id').textContent;

        const option = document.createElement('option');
        option.value = id;
        option.textContent = nombre;
        espacio.append(option);
    })
    
};

getEspacios();

function validateDescription(description){
    const longitud = 20;
    isValid = false;

    if(description.length > longitud){
        isValid=true;
    }
    return isValid;
}



