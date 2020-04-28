const express = require('express'),
      Ubicacion = require('../models/ubicacion'),
      app = express();



app.get('/', (req,res) => {
    Ubicacion.find().exec((err, ubicaciones) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error al encontrar las ubicaciones'
            })
        }

        res.json({
            ok: true,
            ubicaciones
        })
    })
})


app.get('/:id', (req, res) => {
    let id =  req.params.id;

    Ubicacion.findById(id).exec((err, ubicacionE) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: `no exite este ${id}`
            })
        }

        res.json({
            ok: true,
            ubicacionE
        })
    })
})


app.post('/crear', (req,res) => {
    let body = req.body;

    let newUbicacion = {
        estado: body.estado,
        municipio: body.municipio,
        colonia: body.colonia,
        calle: body.calle,
        numero: body.numero,
        cp: body.cp
    }

    Ubicacion.create(newUbicacion, (err, ubicacionCreada) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error al crear esta ubicacion'
            })
        }

        res.json({
            ok: true,
            ubicacionCreada
        })
    })
})


module.exports = app;