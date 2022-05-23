const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema(
    {
    
        cancion: String,
        artista: String,
        album: String,
        anio: String,
        pais: String,
    },
    {
        collection : "canciones",versionKey: false 
    }

);

module.exports = mongoose.model('cancion', cancionSchema);