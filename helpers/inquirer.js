const inquirer  = require('inquirer');
const colors    = require('colors');

const preguntas = [
    {
        type: 'list',                               // Muestra las opciones a manera de una lista
        name: 'opcion',                             // Nombre de la variable donde se almacena la respuesta seleccionada, en este caso el "value"
        message: '¿Qué desea hacer?',               // Pregunta mostrada
        // choices: ['Registrar', 'opt2', 'opt3']      // Opciones de respuesta que tiene la pregunta
        choices:[
            {
                value: '1',             // Valor de la opcion, el valor que retorna, puede ser string o number
                name: `${'1.'.green} Crear tarea`  // Es lo que se va a mostar en la consola
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes.`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s).`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar una tarea.`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir.`
            }
        ]
    }
]


const inquirerMenu = async() => {
    console.clear();
    console.log('============================='.green);
    console.log('   Seleccione una opcion'.white);
    console.log('=============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    // inqirer.prompt recibe un arreglo de preguntas

    return opcion;
}


const pausa = async() => {
    const question = [
        {
            type: 'input',          // Se acciona el presionar ENTER
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar.`,
        }
    ]

    console.log('\n');
    await inquirer.prompt(question);
}


const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message, // El argumento recibido es igual que la propiedad, asi que solo se pone el niombre un vez
            validate( value ) { // Condicionamos a recibir un valor
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const listadoTareadBorrar = async (tareas = []) => {

    // {
    //     value: tarea.id,             // Valor de la opcion, puede ser string o number
    //     name: `${'1.'.green} Crear tarea`  // Es lo que se va a mostar en la consola
    // }
    
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);


    // console.log(id);
    return id;
}


const confirmar = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
 

}


const mostrarListadoChecklist = async (tareas = []) => {

    // {
    //     value: tarea.id,             // Valor de la opcion, puede ser string o number
    //     name: `${'1.'.green} Crear tarea`  // Es lo que se va a mostar en la consola
    // }
    
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox', // retirna un arreglo con todos los ids seleccionados
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);


    // console.log(id);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareadBorrar,
    confirmar,
    mostrarListadoChecklist
}