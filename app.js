const urlEspacios = 'https://intranetjacaranda.es/pruebaJS/espacios.php';
const urlApi = 'http://localhost:3000/reservas';

//Obtener los campos de entrada del formulario a traves de su id
const formulario = document.querySelector('form');
const fecha = document.getElementById('fecha');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono =  document.getElementById('telefono');
const espacio = document.getElementById('espacio');
const descripcion = document.getElementById('descripcion');
const botonReservar = document.getElementById('submit');

//Se obtiene el id que se pasa por parametro de la url al editar el objeto
const urlEditar = window.location.search;
const parametro =  new URLSearchParams(urlEditar);
const id = parametro.get('id');

//Si el id es true se accede a la edicion
if(id){
    //Se modifica el titutlo y el boton a edicion
    const h2 = document.querySelector('h2');
    h2.innerText = 'Editar Reserva de Espacios'

    botonReservar.innerText = "Editar reserva";
    botonReservar.classList= "btn btn-warning";

    //Se captura el id del ultimo div para añadirle un nuevo div que albergara el elemento Estado
    const ultimoDiv = document.getElementById('ultimoDiv');

    //Se crea el div y se le asocia los atributos de bootstrap
    const div = document.createElement('div');
    div.id='nuevoDiv';
    div.classList = 'mb-3';
    ultimoDiv.appendChild(div);

    //Se crea el elemento Estado
    const label = document.createElement('label');
    label.innerText = 'Estado'
    label.classList= 'form-label';
    const nuevoDiv = document.getElementById('nuevoDiv');
    nuevoDiv.append(label);

    const estado = document.createElement('select');
    estado.classList= "form-control";

    //Se crea el elemento option que alberga los diferentes estados de la reserva 
    const option = document.createElement('option');
    option.textContent="Pendiente";

    const optionAprobada = document.createElement('option');
    optionAprobada.textContent="Aprobada";

    const optionRechazada = document.createElement('option');
    optionRechazada.textContent="Rechazada";

    //Se asocian al elemento
    estado.append(option);
    estado.append(optionAprobada);
    estado.append(optionRechazada);
    nuevoDiv.append(estado);

    //Funcion para obtener las reservas de la api 
    async function getReservas(){

        const respuesta = await fetch (urlApi);

        if(!respuesta.ok){
            console.error('Error al obtener la respuesta')
        }

        const reservas = await respuesta.json();

        reservas.forEach(reserva =>{

            //Si el id que obtenemos de la url coincide con el id de la reserva en la api vamos asociando su valor con el
            //campo de entrada del formulario
            if(id === reserva.id){

                //Añadimos el atributo readonly para que no pueda ser modificado
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

    //Llamos a la funcion
    getReservas();

    //Se le asocia un evento al boton de editar 
    botonReservar.addEventListener('click', async(e) =>{
        e.preventDefault();
        isValidDescription = false;

        //Valida el campo descripcion para que cumpla con los requisitos previsto
        if(validateDescription(descripcion.value)){
            isValidDescription = true;
    
            //Si la validacion es verdadera no le añadimos nigun mensaje
            if(isValidDescription){
                const success = document.getElementById('smallDescripcion');
                success.className = "";
                success.innerText = "";
            }
    
        }else {
            //Si el campo descriocion la validacion es false entonces montramos el mensaje de error 
            const error = document.getElementById('smallDescripcion');
            error.className = 'text-danger';
            error.innerText = "Error, el campo descripcion debe tener mínimo 20 caracteres";
        }
    
        //Seleciona el valor de la etiqeuta option del espacio de reserva de la api
        const valorEspacio = espacio.selectedOptions[0].textContent;

        //Si la validacion es true se procede a editar el obtjeto
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
//Si el id es false es decir no cuenta con un id valido entonces se procede a añadir una reserva
}else {

    botonReservar.addEventListener('click', async (e) => {
    
        //Variables booleanas que almacenan el valor de la validez del formulario, es decir , de los respectivos campos
        // que conforma el formulario
        e.preventDefault();
        isValidDate = false;
        isValidEmail = false;
        isValidPhone = false;
        isValidDescription = false;
        
        //Se procede a validad cada campo
        if(validateDate(fecha.value)){
            isValidDate = true;
    
            //Si es true no se muestra mensaje
            if(isValidDate){
                const success = document.getElementById('smallFecha');
                success.className = "";
                success.innerText = "";
            }
    
            //Si es false se muestra el mensaje de error
        }else {
            const error = document.getElementById('smallFecha');
            error.className = 'text-danger';
            error.innerText = "Error, la fecha no puede ser posterior al día actual";
        }
    
        //Valida el email
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
    
        //Valida el telefono
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
    
        //Valida la descripcion 
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
    
        //Si todas las validaciones son correctas se procede a añadir el objeto a la api
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
                //redirije a la lista en cuanto se añade 
                window.location.href = 'list.html';
            }
        }
    })
}

//Funciones para validar cada campo del formulario 
//Valida el campo fecha
function validateDate(date){
    const fechaActual = new Date(); //fecha actual
    const fechaSeleccionada = new Date(date); //fecha seleccionada
    isValid = false;

    //Si la fecha seleccionada es inferior o igual es correcta
    if(fechaSeleccionada <= fechaActual ) {
        isValid = true;
    }
    return isValid;
}

//Funcion para validad email
function validateEmail(email){
    isValid = false;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Expresion regular 

    if(email.length > 0){
        
        if(regexEmail.test(email)) {
                isValid = true;
        }
    }
    return isValid;
}

//Funcion para validar el telefono
function validatePhone(phone){
    const regexTelefono = /^\d{9}$/; //Expresion regular
    isValid = false;

    if(phone > 0){
    
        if(regexTelefono.test(phone)){
            isValid = true;
        }
    }
    return isValid;
}

//Funcion para obtener los espacios en el campo select
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

//Funcion para validar el campo descripcion
function validateDescription(description){
    const longitud = 20;
    isValid = false;

    if(description.length > longitud){
        isValid=true;
    }
    return isValid;
}



