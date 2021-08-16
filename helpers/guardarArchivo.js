const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data)); // "JSON.stringify" convierte un objeto o valor js en una cadena de texto JSON
}

const leerDB = () => {
    if ( !fs.existsSync(archivo) ) return null; // "fs.existsSync" retorna "true" si el archivo existe y "false" en caso contrario

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'}); // Lectura del archivo, es necesario el encoding o lo devuelve como bites. Lo devuelve como string
    const data = JSON.parse(info); // Parseamos el contenio del archivo a JSON (formateamos), "JSON.parse" es la operacion contraria de "JSON.stringify"
    // console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB,
}