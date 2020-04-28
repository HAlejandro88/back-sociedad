const mongoose = require('mongoose');



const responsableSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Se requiere de un nombre del responsable']
    },
    apellidos: {
        type: String,
        required: [true, 'Se necesita de unos apellidos']
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresa'
    }
})


module.exports = mongoose.model('responsable', responsableSchema);