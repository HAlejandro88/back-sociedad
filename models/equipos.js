const mongoose = require('mongoose');


const equipoSchema = new mongoose.Schema({
    idEquipo:{
        type: String,
        required: [true, 'se requiere el id del equipo']
    },
    marca:{
        type: String,
        required: [true, 'se necesita de una marca']
    },
    modelo: {
        type: String,
        required: [true, 'se requiere de un modelo'] 
    },
    numSerie: {
        type: String,
        required: [true, 'Se require de un numero de serie'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresa',
        required: [true, 'Se require de una empresa']
    },
    fechaCalibracion: {
        type: String,
        required: false
    },
    proximaCalibracion: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: [true, 'se require de una descripcion']
    },
    certificado: {
        type: String,
        required: false
    },

    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'responsable'
    }

})

module.exports = mongoose.model('equipo', equipoSchema);