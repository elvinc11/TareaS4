const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
//var path = require('path');
var express = require('express');
var router = express.Router(); 

const cancionSchema = require('./src/model/cancion');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(function (req, res, next){
    console.log('Enrutamiento Exitoso');
    next();
});

router.get("/canciones", (req,res) => {
    cancionSchema
        .find((err,canciones) => {
            if(err) res.status(500).send('Error en la BD');
            else res.status(200).json(canciones);
        });
});


router.get("/canciones/porartista", function (req, res) {
    cancionSchema.find({ artista: { $eq: req.query.artista } }, function (err, canciones) {
      if (err) {
        console.log("error");
        res.status(500).send("error en el servidor: artista");
      } else res.status(200).json(canciones);
    });
  });  
  
  router.get("/canciones/entreanios", function (req, res) {
    let min = req.query.anio1;
    let max = req.query.anio2;
    cancionSchema.find({ anio: { $gte: min, $lte: max} }, function (err, canciones) {
        console.log(min,max);
      if (err) {
        console.log("error");
        res.status(500).send("error de servidor: entreanios");
      } else res.status(200).json(canciones);
    });
  }); 


router.get("/canciones/:id", function (req, res) {
    cancionSchema.findById(req.params.id, function (err, canciones) {
      if (err) res.status(500).send("error en el servidor: id");
      else {
        if (canciones != null) {
          res.status(200).json(canciones);
        } else res.status(404).send("No se encontro la Cancion");
      }
    });
  });


router.post("/canciones", (req, res) => {
    const cancion = new cancionSchema({
      cancion: req.body.cancion,
      artista: req.body.artista,
      album: req.body.album,
      año: req.body.año,
      pais: req.body.pais,
    });
  
    cancion.save(function (error, cancion1) {
      if (error) {
        res.status(500).send("No se ha podido agregar.");
      } else {
        res.status(200).json({cancion:cancion._id}); 
      }
    });
  });

  router.delete("/canciones/:id", function (req, res) {
    cancionSchema.findById(req.params.id, function (err, canciones) {
      if (err) res.status(500).send("Error en la base de datos");
      else {
        if (canciones != null) {
          canciones.remove(function (error, result) {
            if (error) res.status(500).send("Error en la base de datos");
            else {
              res.status(200).send("Eliminado exitosamente");
            }
          });
        } else res.status(404).send("No se encontro esa Cancion");
      }
    });
    });

module.exports = router;