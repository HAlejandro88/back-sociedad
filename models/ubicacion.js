const mongoose = require('mongoose');


const ubicacionSchema = new mongoose.Schema({
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
    }
})


module.exports = mongoose.model('ubicacion', ubicacionSchema);