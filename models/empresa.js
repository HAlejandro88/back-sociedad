const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'se necesita de un nombre para la empresa'],
        unique: true
    },

    descripcion:{
        type: String,
        required: [true, 'se require de una descripcion de la empresa']
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        required: [true, 'se require de un estado']
    },
    municipio: {
        type: String,
        required: [true, 'se requiere de un municipio']
    },
    colonia: {
        type: String,
        required: [true, 'se requiere de una colinia']
    },
    calle: {
        type: String,
        required: [true, 'se requiere de una calle o una avenida']
    },

    numero: {
        type: Number,
        required: true
    },

    cp: {
        type: Number,
        required: true
    },
    create: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model('empresa', empresaSchema);