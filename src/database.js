const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/mern-crud-restaurante';

mongoose.connect(URI)
  .then(db => console.log('Conectado a la base de datos...'))
  .catch(error => console.error(error));

module.exports = mongoose;
