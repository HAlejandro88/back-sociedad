const express = require('express'),
      bcrypt = require('bcrypt'),
      Usuario = require('../models/usuario'),
      {verificarToken} = require('../server/middlewares/auth'),
      app = express();

app.post('/crear', (req, res) => {
    let body = req.body;

    let newUser = {
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        nombre: body.nombre,
        role: body.role
    }

    Usuario.create(newUser, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al crear un usuario',
                err
            })
        }

        res.status(201).json({
            ok: true,
            usuarioBD
        })
    })
})


app.get('/', [verificarToken], (req,res) => {
    Usuario.find().exec((err, usuarios) => {
        if (err) {
            res.status(500).json({
                oj: false,
                message: 'error al traer usuarios',
                err
            })
        }

        res.json({
            ok: true,
            usuarios
        })
    })
})


module.exports = app;