// Primero van las importaciondes de paques de terceros
const colors = require('colors'); // Importacion del paquete colors
// Despues van nuestras importaciones
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareadBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');  // Importacion de los métodos del archivo "inquirer"
const Tareas = require('./models/tareas'); // Importacion de la calse de tareas del aarchivo "tareas"
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB(); // Lamada a la función de lectura del archivo

    if ( tareasDB ) {
        tareas.cargarTareasFomArr(tareasDB);
    }

    do {
        // Imprimir el menu y obtencion de la opción seleccionada
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': // Creación de una nueva tarea
                const descripcion = await leerInput('Descripción: ');
                tareas.crearTarea(descripcion);
                break;
        
            case '2': // Listado de tareas
                tareas.listadoCompleto();
                break;

            case '3': // Listar completadas
                tareas.listarPendientesCompletadas(true)
                break;

            case '4': // Lstar pendientes 
                tareas.listarPendientesCompletadas(false)
                break;
            
            case '5': // Completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;

            case '6': // Borrar
                const id = await listadoTareadBorrar( tareas.listadoArr ); 
                if ( id !== '0' ) {
                    const ok = await confirmar('Esta sguro?');
    
                    if ( ok ) {
                        tareas.borrarTrea( id )
                    }
                    // console.log( { ok } );
                }
                break;
        }

        // Guardadno las tareas en un archivo
        guardarDB( tareas.listadoArr );
        
        // Llamada a la función de pausa
        await pausa();
    } while (opt !== '0'); // Dejara de mostrarse el menú cuando se envie un 0


    // pausa();
}

main();