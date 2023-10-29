const mongoose = require('mongoose');

// Configura la conexión a MongoDB
mongoose.connect('mongodb+srv://niiqow:3HMXy3Knvf92Ex7u@tienda.ykexvp1.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Manejo de eventos de conexión

// Evento 'open' que se dispara una vez que la conexión es establecida
mongoose.connection.on('open', () => {
  console.log('Conexión a la base de datos establecida con éxito');
});

// Manejo de errores de conexión
mongoose.connection.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

module.exports = mongoose; // Exporta la instancia de Mongoose
