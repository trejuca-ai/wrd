$(document).ready(function () {
    /**
     * Seccion de variables globales
     */
    const EMPLEADOS_KEY = "employees"
    let empleadosData = []
    let empleadoIdGlobal = ""

    /**
     * Seccion de funciones principales
     * 
     */

    /**
     * Obtener todos los empleados desde localstorage
     */
    function obtenerEmpleados() {
        const empleados = localStorage.getItem(EMPLEADOS_KEY)
        return empleados ? JSON.parse(empleados) : []
    }

    /**
     * Guardar los empleados en localstorage
     * @param {array} empleados 
     */
    function guardarEmpleados(empleados) {
        localStorage.setItem(EMPLEADOS_KEY, JSON.stringify(empleados))
    }

    /**
     * Generar id para empleado
     * @returns Id del empleado
     */
    function generarId() {
        return crypto.randomUUID()
    }

    /**
     * Renderizar los empleados exsitentes en localStorage
     * en pantalla
     */
    function mostrarEmpleados(empleados) {

        const listaEmpleados = $('#listaEmpleados')
        listaEmpleados.empty()

        empleados.forEach(empleado => {
            const empleadoTarjeta = `
                <div class="col">
                    <div class="card shadow-md w-auto">
                        <div class="avatar">
                            <img src="./img/avatar.png" class="card-img-top">
                        </div>
                        <div class="card-body text-center">
                            <h4 class="card-title">${empleado.nombre} ${empleado.apellido}</h4>
                            <p class="card-text">${empleado.departamento}</p>
                            <div class="d-flex justify-content-center mt-3">
                                <button class="btn btn-warning btn-sm editar-empleado" data-id="${empleado.empleadoId}" data-bs-toggle="modal" data-bs-target="#modalEmpleado">
                                    <i class="bi bi-pencil-fill me-2"></i>Editar
                                </button>
                                <button class="btn btn-danger btn-sm eliminar-empleado" data-id="${empleado.empleadoId}" data-bs-toggle="modal" data-bs-target="#modalEmpleadoEliminar">
                                    <i class="bi bi-trash-fill me-2"></i>Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            listaEmpleados.append(empleadoTarjeta)
        })
    }

    /**
     * Funcion que muestra todos los empleados
     * en pantalla
     */
    function main() {
        empleadosData = obtenerEmpleados()
        mostrarEmpleados(empleadosData)
    }

    main()

    /**
     * Seccion de eventos
     */

    //Evento al abrir el modal para nuevo empleado
    $('#nuevoEmpleadoBoton').on('click', function() {
        $('#formularioEmpleado')[0].reset() //limpiar el formulario
    })

    //Evento al abrir el modal para guardar empleado
    $('#formularioEmpleado').on('submit', function(event) {
        event.preventDefault()
        debugger
        const empleadoId = $('#empleadoId').val()
        const nombre = $('#nombre').val()
        const apellido = $('#apellido').val()
        const fechaNacimiento = $('#fechaNacimiento').val()
        const departamento = $('#departamento').val()

        const nuevoEmpleado = {
            empleadoId: empleadoId || generarId(),
            nombre,
            apellido,
            fechaNacimiento,
            departamento
        }

        if (empleadoId) {
            empleadosData = empleadosData.map(
                empleado => empleado.empleadoId === empleadoId ? nuevoEmpleado : empleado)
        } else {
            empleadosData.push(nuevoEmpleado)
        }

        guardarEmpleados(empleadosData)
        $('#formularioEmpleado')[0].reset()
        $("#modalEmpleado").modal('hide')
        mostrarEmpleados(empleadosData)
    })

    //Evento al abrir el modal para editar empleado
    $(document).on('click', '.editar-empleado', function() {
        const empleadoId = $(this).data('id')
        const empleado = empleadosData.find(emp => emp.empleadoId === empleadoId)

        if (empleado) {
            $('#empleadoId').val(empleado.empleadoId)
            $('#nombre').val(empleado.nombre)
            $('#apellido').val(empleado.apellido)
            $('#fechaNacimiento').val(empleado.fechaNacimiento)
            $('#departamento').val(empleado.departamento)
        }
    })

    // Evento para manejar la eliminacion
    $(document).on('click', '.eliminar-empleado', function() {
        empleadoIdGlobal = $(this).data('id')
    })

    $('#eliminarEmpleado').on('click', function() {
        if (empleadoIdGlobal) {
            empleadosData = empleadosData.filter(empleado => empleado.empleadoId !== empleadoIdGlobal)
            guardarEmpleados(empleadosData)
            $('#modalEmpleadoEliminar').modal('hide')
            mostrarEmpleados(empleadosData)
            alert("Empleado eliminado")
            empleadoIdGlobal = null
        }
    })
})