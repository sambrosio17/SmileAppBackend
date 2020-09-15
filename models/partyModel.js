const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartySchema = new Schema({
  titolo: {
    type: String,
    require: true
  },
  tipologia: {
    type: String,
    require: true
  },
  indirizzo: {
    type: String,
    require: true
  },
  numero_bambini: {
    type: Number,
    require: true
  },
  data: {
    type: Date,
    require: true
  },
  telefono: {
    type: String,
    require: true
  },
  ora_inizio: {
    type: String,
    require: true
  },
  ora_fine: {
    type: String,
    require: true
  },
  numero_animatori: {
    type: Number,
    require: true
  },
  prezzo: {
    type: Number,
    require: true
  },
  paga_animatore: {
    type: Number,
    require: true
  },
  informazione: {
    type: String
  },
  animatori_disponibili: {
    type: Array
  },
  animatori_scelti: {
    type: Array
  },
  terminata: {
    type: Boolean
  },
});

const Party = mongoose.model("Party", PartySchema);

module.exports = Party;