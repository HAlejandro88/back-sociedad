const express = require('express'),
      Responsable = require('../models/responsable'),
      app = express();


app.get('/', (req,res) => {
    Responsable.find()
               .populate('empresa', 'nombre')
               .exec((err, responsables) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error al traer los responsables'
            })
        }

        res.json({
            ok: true,
            responsables
        })
    })
})


app.get('/:id', (req, res) => {
    let id = req.params.id;

    Responsable.findById(id)
               .populate('empresa', 'nombre')
               .exec((err, responsable) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: `Error al encontrar ese ${id}`
            })
        }

        res.json({
            ok: true,
            responsable
        })
    })
})


app.post('/crear', (req,res) => {
    let body = req.body;

    let newResponsable = {
        nombre: body.nombre,
        apellidos: body.apellidos,
        empresa: body.empresa
    }

    Responsable.create(newResponsable, (err, responsableCreado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error al crear responsable'
            })
        }

        res.json({
            ok: true,
            responsableCreado
        })
    })
})



module.exports = app;