const express = require('express'),
      Equipos = require('../models/equipos'),
      app = express();



app.get('/', (req,res) => {
    Equipos.find()
           .populate('cliente', 'nombre')
           .populate('usuario', 'nombre')
           .populate('responsable', 'nombre')
           .exec((err, equipos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error al encontrar los equipos'
            })
        }

        res.json({
            ok: true,
            equipos
        })
    })
})


app.get('/:id', (req,res) => {
    let id = req.params.id;

    Equipos.findById(id).exec((err, equipoEncontrado) => {
        if (err) {
          res.status(500).json({
              ok: false,
              message: `Error al encontrar ese ${id}`
          })  
        }

        res.json({
            ok: true,
            equipoEncontrado
        })
    })
})


app.post('/crear', (req, res) => {
    let body = req.body;

    let newEquipo = {
        idEquipo: body.idEquipo,
        marca: body.marca,
        modelo: body.modelo,
        numSerie: body.numSerie,
        cliente: body.cliente,
        fechaCalibracion: body.fechaCalibracion,
        proximaCalibracion: body.proximaCalibracion,
        descripcion: body.descripcion,
        responsable: body.responsable,
    }

    Equipos.create(newEquipo, (err, equipoCreado ) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error al crear equipo'
            })
        }

        res.json({
            ok: true,
            equipoCreado
        })
    })
})


module.exports = app;