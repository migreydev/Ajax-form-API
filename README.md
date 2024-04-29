Gestor de Reservas de Espacios
Descripción del Ejercicio:

El objetivo es desarrollar una aplicación de gestión de reservas de espacios que permita a los usuarios reservar y administrar la disponibilidad de espacios en un entorno específico, utilizando una API para la manipulación de datos. Se establecerán campos obligatorios y validaciones para garantizar la integridad de la información registrada.

Utiliza la siguiente tarea de Github Classroom para la entrega del ejercicio: Sign in to GitHub · GitHub

Requisitos del Ejercicio:

Registro de Reservas:
Crear un formulario para registrar reservas con los siguientes campos:

Fecha de la reserva (no puede ser posterior al día actual).
Nombre del solicitante.
Email del solicitante (deberá comprobarse que sea un email válido).
Teléfono de contacto (debe ser un número de teléfono válido).
Espacio a reservar (se cargará desde una API como campo select).
Descripción detallada de la reserva (mínimo 20 caracteres).
Validaciones y Estado de la Reserva:
Asegurar que los campos obligatorios están completos y que las fechas son válidas.

La descripción de la reserva debe tener un mínimo de 20 caracteres.
Cuando se cree una reserva, automáticamente se establecerá con estado "Pendiente".

Visualización de Reservas Pendientes o Aprobadas:
En una página diferente, cargar todas las reservas que se encuentren en estado "Pendiente" o "Aprobada".

Por cada reserva se mostrará el número de reserva (id), la fecha, el espacio reservado y el nombre del solicitante.
Cada reserva mostrará un botón "Ver Detalles".

Edición de Reservas:
Al hacer clic en el botón "Ver Detalles", se redirigirá a la página con el formulario de reservas cargado con los datos correspondientes.

Se cambiará el encabezado de la página y el botón de enviar el formulario.
Se mostrarán todos los campos de la reserva en modo lectura, salvo la descripción. Además, se incluirá el campo de estado con un select para cambiar entre "Pendiente", "Aprobada" y "Rechazada" (debe cargarse el estado actual).

Otros Detalles Adicionales:
Se deberá utilizar validación en el cliente.

Se puede agregar una funcionalidad extra, como la asignación de prioridades a las reservas, o la asignación de responsables de la aprobación/rechazo de las reservas.
Nota:

API para obtener los espacios: https://intranetjacaranda.es/pruebaJS/espacios.php

Formato de respuesta:
<espacios>
    <espacio>
        <id>1</id>
        <nombre>Sala de Reuniones A</nombre>
    </espacio>
    <espacio>
        <id>2</id>
        <nombre>Sala de Conferencias B</nombre>
    </espacio>
    <!-- Otros espacios aquí -->
</espacios>
Fichero JSON de ejemplo para las reservas para json-server:

{
"reservas": [
  {
    "id": 1,
    "fecha": "2024-03-15",
    "nombre_solicitante": "Juan Pérez",
    "email_solicitante": "juan@example.com",
    "telefono_contacto": "123456789",
    "espacio_reservado": "Sala de Reuniones A",
    "descripcion": "Reunión de equipo",
    "estado": "Pendiente"
  },
  {
    "id": 2,
    "fecha": "2024-03-16",
    "nombre_solicitante": "María Gómez",
    "email_solicitante": "maria@example.com",
    "telefono_contacto": "987654321",
    "espacio_reservado": "Sala de Conferencias B",
    "descripcion": "Presentación de proyecto",
    "estado": "Aprobada"
  },
  {
    "id": 3,
    "fecha": "2024-03-17",
    "nombre_solicitante": "Ana Rodríguez",
    "email_solicitante": "ana@example.com",
    "telefono_contacto": "456123789",
    "espacio_reservado": "Salón Principal",
    "descripcion": "Evento de networking",
    "estado": "Pendiente"
  }
]
}
Criterios de evaluación:

Correcta utilización de XMLHttpRequest o fetch para realizar peticiones Ajax a la API de espacios y a la API de reservas.
Funcionamiento adecuado del formulario de registro de reservas y la visualización de reservas pendientes o aprobadas.
Implementación correcta del formulario de edición de reservas con validaciones y cambio de estado.
Uso apropiado de las APIs para manipular y administrar datos de espacios y reservas.
Manejo adecuado de las validaciones de los formularios y el estado de las reservas.
Control de errores y manejo de excepciones.