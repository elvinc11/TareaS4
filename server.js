const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require('path');
var canciones = require('./canciones');

const app = express();

//puerto de la app
app.listen(3000, () => console.log("Escuchando puerto 3000!"));

//x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',canciones);

app.use(function (res, res, next){
    next();
});

mongoose
    .connect(
        "mongodb+srv://mongo:1Ju47nBnuH33HMsW@cluster0.1wepo.mongodb.net/cancionesBD?retryWrites=true&w=majority"
    ).then(() => console.log('Conectado a Atlas'))
    .catch((error) => handleError(error));


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.get('/canciones', function(req,res){
    res.sendFile(path.join(__dirname, 'public','canciones.html'));
});

app.use(function(req, res, next) {
    res.status(404).send('Esa pagina no existe!');
  });