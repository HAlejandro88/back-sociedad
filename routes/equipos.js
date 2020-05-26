const express = require('express'),
      Equipos = require('../models/equipos'),
      app = express();



app.get('/', (req,res) => {
    Equipos.find()
           .populate('cliente')
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
    try {
        let id = req.params.id;

        Equipos.findById(id).exec((err, equipoEncontrado) => {
            try {
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
            } catch (error) {
                console.log(error.message);
                res.status(400).json({
                    ok: false,
                    menssage: 'Erro al tarer el equipo'
                })
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            ok: false,
            menssage: 'Erro al tarer el equipo'
        })
    }
})


app.post('/crear', (req, res) => {
    let body = req.body;
    let file = req.file;

    let newEquipo = {
        idEquipo: body.idEquipo,
        marca: body.marca,
        modelo: body.modelo,
        numSerie: body.numSerie,
        cliente: body.cliente,
        fechaCalibracion: body.fechaCalibracion,
        proximaCalibracion: body.proximaCalibracion,
        descripcion: body.descripcion,
        denominacion: body.denominacion,
        responsable: body.responsable,
        filename: file.filename,
        path: '/upload/' + req.file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
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


//Actualizar equipos 

app.put('/:id', (req,res) => {
    try {

        let id = req.params.id;
        let body = req.body;

        Equipos.findById(id).exec((err, equipo) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    message: 'Error al traer equipo'
                })
            } 

            if (!equipo) {
                return res.status(404).json({
                    ok: false,
                    message: `El producto no existe con ese ${id}`,
                    errors: {message: `no existe equipo con ese id`}
                })
            }

            equipo.idEquipo = body.idEquipo,
            equipo.marca = body.marca,
            equipo.modelo = body.modelo,
            equipo.numSerie = body.numSerie,
            equipo.cliente = body.cliente,
            equipo.fechaCalibracion = body.fechaCalibracion,
            equipo.descripcion = body.descripcion,
            equipo.denominacion = body.denominacion,
            equipo.responsable = body.responsable,

            equipo.save((err, equipoActualizado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: 'error al actualizar el producto'
                    })
                }

                res.json({
                    ok: true,
                    equipoActualizado
                })
            })
        })
        
    } catch (error) {
        if (error) {
            res.status(404).json({
                ok: false,
                message: 'se produjo un error'
            })
        }
        console.error(error.message);
    }
})

//buscar equipo por empresa 

app.get('/cliente/:cliente', (req, res) => {

    try {
        let cliente = req.params.cliente;
        Equipos.find({cliente: cliente})
                .populate('cliente')
                .exec((err, equipo) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    message: 'error al traer equipos con ese clientes'
                })
            }

            res.json({
                ok: true,
                equipo
            })
        })
    } catch (error) {
        console.error(error);
    }
})


//BORRAR EQUIPO

app.delete('/:id', (req, res) => {
    
    let id = req.params.id;

    Equipos.findByIdAndRemove(id, (err, equipoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al  borrar equipo',
                errors: err
            });
        }

        if (!equipoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un equipo con ese id',
                errors: { message: 'No existe un equipo con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            equipoBorrado
        });

    });

});



module.exports = app;