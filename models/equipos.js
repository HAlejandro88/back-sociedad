const mongoose = require('mongoose');


const equipoSchema = new mongoose.Schema({
    idEquipo:{
        type: String,
        required: [true, 'se requiere el id del equipo']
    },
    marca:{
        type: String,
        /* required: [true, 'se necesita de una marca'] */
    },
    modelo: {
        type: String,
        /* required: [true, 'se requiere de un modelo']  */
        required: false
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
        required: false
    },
    denominacion: {
        type: String,
        /* required: [true, 'se require de una denominacion'] */
    },
    responsable: {
        type: String,
        /* required: [true, 'se requiere responsable']  */
    },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    archivo: { type: String },
    mimetype: { type: String },
    size: { type: Number },

})

module.exports = mongoose.model('equipo', equipoSchema);