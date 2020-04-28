require('./config/config');

const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      loginRoutes = require('../routes/login'),
      authRoutes = require('../routes/auth'),
      Empresas = require('../routes/empresa'),
      ubicacion = require('../routes/ubicacion'),
      usuario = require('../routes/usuario'),
      Responsable = require('../routes/responsable'),
      equipos = require('../routes/equipos'),
      app = express(),
      cors = require('cors');


mongoose.connect("mongodb://localhost:27017/metrol", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => {
    console.log('base de Datos: \x1b[32m%s\x1b[0m', 'online');
}).catch((error) => console.log(error));


app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/user',usuario);
app.use('/user/login', loginRoutes);
app.use('/user/auth', authRoutes);
app.use('/ubicacion', ubicacion);
app.use('/responsable', Responsable);
app.use('/equipos', equipos);
app.use('/empresas', Empresas);

app.get('/', (req,res) => {
    res.status(200).json({
        ok: true,
        menssage: 'bienvenido a las apis de metrologia'
    })
});




app.listen(process.env.PORT, 
           () => console.log('esta vivo: \x1b[32m%s\x1b[0m', 'linea'))


