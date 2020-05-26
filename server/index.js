require('./config/config');

const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      multer = require('multer'),
      morgan = require('morgan'),
      loginRoutes = require('../routes/login'),
      authRoutes = require('../routes/auth'),
      empresaRoutes = require('../routes/empresa'),
      usuarioRoutes = require('../routes/usuario'),
      equiposRoutes = require('../routes/equipos'),
      archivoRoutes = require('../routes/archivo'),
      uuid = require('uuid/v4'),
      path = require('path'),
      app = express(),
      cors = require('cors');




mongoose.connect("mongodb://localhost:27017/metrol", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => {
    console.log('base de Datos: \x1b[32m%s\x1b[0m', 'online');
}).catch((error) => console.log(error));


app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../upload'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

app.use('/user',usuarioRoutes);
app.use('/user/login', loginRoutes);
app.use('/user/auth', authRoutes);
app.use('/equipos', equiposRoutes);
app.use('/empresas', empresaRoutes);
app.use('/archivo', archivoRoutes);

app.get('/', (req,res) => {
    res.status(200).json({
        ok: true,
        menssage: 'Bienvenido a las apis de Metrologia'
    })
})


app.listen(process.env.PORT, 
           () => console.log('esta vivo: \x1b[32m%s\x1b[0m', 'linea'))


