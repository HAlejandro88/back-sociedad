const express = require('express'),
      {verificarToken, verificarAdmin} = require('../server/middlewares/auth'),
      app = express();


app.get('/', [verificarToken], (req,res) => {
    return res.status(200).json({
        ok: true,
        user: req.user
    })
})

app.get('/admin', [verificarAdmin], (req,res) => {
    try {
        res.status(200).json({
            ok: true,
            user: req.user
        })
    } catch (error) {
        console.log(error);
    }
})



module.exports = app;