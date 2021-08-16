// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid'); // Se le da un alias al v4, en lugar de llamarlo como v4 se le llamara con uuidv4

class Tarea {
    id = '';
    descripcion = '';
    completadoEn = null;

    constructor( desc ) {
        this.id = uuidv4(); // Crea un id unico a nivel muldial para nuestra tarea
        this.descripcion = desc;
        this.completadoEn = null;
    }

}

module.exports = Tarea; // Exportacion de la clase