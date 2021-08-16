/**
 * _listado.
 *          { uuid-12345678-34567-3: Tarea:{id: 12, descripcion: asda, completadoEn:23o1n} }
 */
const colors = require('colors');

const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => { // "Object.keys" devuelve un array de las propiedades "name" de un objeto, con el "foeach" barremos cada uno de esos "name"
            const tarea = this._listado[key];
            listado.push(tarea); // Añadimos el contenido de la tarea al arreglo
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTrea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFomArr(tareas = []) {
        tareas.forEach( tarea => { // Barremos cada elemento en el array, cada elemento es una tarea en concreto
            this._listado[tarea.id] = tarea; // Guardamos la tarea dentro del objeto
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log('\n');
        this.listadoArr.forEach( (tarea, i) => { // El "forEach" tiene como sgundo argumento el indice
            const idx = `${i + 1}`.green;

            const { descripcion, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${idx + '.'.green} ${descripcion} :: ${estado}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log('\n');
        let contador = 0;
        this.listadoArr.forEach( tarea => { // El "forEach" tiene como sgundo argumento el indice

            const { descripcion, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            if ( completadas ) {
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${descripcion} :: ${completadoEn.green}`);
                }
            }
            else {
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${descripcion} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas ( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        
        this.listadoArr.forEach( tarea => {
            if ( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;