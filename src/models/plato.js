const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlatoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  precio: {type: Number, required: true}
});



module.exports = mongoose.model('Plato', PlatoSchema);
