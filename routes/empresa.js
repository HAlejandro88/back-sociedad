const express = require('express'),
      Empresa = require('../models/empresa'),
      {verificarToken} = require('../server/middlewares/auth'),
      app = express();



app.get('/', (req,res) => {
    Empresa.find()
           .populate('usuario', 'nombre')
           .populate('ubicacion')
           .exec((err, empresas) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error al traer empresas'
            })
        }

        res.json({
            ok: true,
            empresas
        })
    })
})



app.post('/crear', (req,res) => {
    let body = req.body;

    let newEmpresa = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: body.estado,
        municipio: body.municipio,
        colonia: body.colonia,
        calle: body.calle,
        numero: body.numero,
        cp: body.cp
    }

    Empresa.create(newEmpresa, (err, empresaCreada) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error al crear empresa'
            })
        }

        res.json({
            ok: true,
            empresaCreada
        })
    })
})



module.exports = app;