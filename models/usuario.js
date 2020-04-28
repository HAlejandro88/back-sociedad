const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'se requiere de un nombre de usuario']
    },

    email: {
        type: String,
        required: [true, 'se requiere de un email unico para ingresar'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Se necesita de una contraseña']
    },

    role: {
        type: String,
        required: [true, 'se necesita de un role'],
        default: 'USUARIO_ROLE'
    },
    img: {
        type: String,
        required: false
    },
    createAd: {
        type: Date,
        default: Date.now()
    }
})


usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


module.exports = mongoose.model('usuarios', usuarioSchema);