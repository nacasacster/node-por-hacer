const fs = require('fs');
//const color = require('colors');
let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}
const getListado = () => {

    cargarDB();
    return listadoPorHacer;
}
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}
const borrar = (descripcion) => {
    cargarDB();

    //me trae el listado de los datos del .json exepto el que tiene la descricion enviada en el comando
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    // se comparan los dos listados haber si son iguales 
    if (listadoPorHacer.length === nuevoListado.length) {
        //retorna falso por que los listados son iguales lo que quiere decir que no encontro ningun registro para borrar
        return false;
    } else {
        //si es diferente es por que encontro un registro igual al enviado desde consola entonces ese registro debe ser borrado
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}