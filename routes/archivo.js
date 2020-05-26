const express = require('express'),
      path = require('path'),
      fs = require('fs'),
      app = express();


app.get('/:archivo', (req, res) => {
    let archivo = req.params.archivo;

    let pathArchivo = path.resolve(__dirname, `../upload/${archivo}`);
    console.log(pathArchivo);

    if (fs.existsSync(pathArchivo)) {
        res.sendFile(pathArchivo)
    } else {
        let pathNoImagen = path.resolve(__dirname, '../assets/no-archivo.pdf');
        res.sendFile(pathNoImagen);
    }
})


module.exports = app;