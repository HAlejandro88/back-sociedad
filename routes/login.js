const express = require('express'),
      bcrypt = require('bcrypt'),
      Usuario = require('../models/usuario'),
      jwt = require('jsonwebtoken'),
      app = express();


app.post('/', (req,res) => {
    let body = req.body;
    console.log(body);

    Usuario.findOne({email: body.email}, (err, usarioBD) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        if (!usarioBD) {
            return res.status(400).json({
                message: 'el email es incorrecto'
            })
        }

        if(!bcrypt.compareSync(body.password, usarioBD.password)) {
            return res.status(400).json({
                err: {message: 'La contraseña es incorrecta'}
            })
        }
        let token = jwt.sign({
            user: usarioBD
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});

        res.status(201).json({
            ok: true,
            token
        })
    })
})

module.exports = app;