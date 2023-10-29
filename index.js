const express = require('express');
const app = express();
const passport = require('passport');
const corsConfig = require('./middlewares/cors'); // Reemplaza con la ruta real a tu archivo de configuración de CORS

// Importa la configuración de la base de datos
require('./db');

// Importa tus middlewares
const authenticationMiddleware = require('./middlewares/authentication');

// Importa las rutas relacionadas con productos
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/category');
const subCategoryRoutes = require('./routes/subCategory');
// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(express.json());

// Configuración de CORS
app.use(corsConfig);

// Configuración de Passport.js (si es necesario)
// passport.use(new LocalStrategy({/* configura la estrategia */}, (username, password, done) => {
//   // Implementa la lógica de autenticación
// }));

// Rutas públicas: No requieren autenticación
app.use('/products', productRoutes); // Rutas relacionadas con productos
app.use('/category', categoryRoutes); // Rutas relacionadas con categorias
app.use('/subcategory', subCategoryRoutes); // Rutas relacionadas con sub categorias
// Rutas protegidas: Requieren autenticación
app.get('/api/admin', authenticationMiddleware, (req, res) => {
  // Lógica para rutas protegidas
  res.json({ message: 'Ruta protegida para el administrador' });
});

// Otras configuraciones y rutas

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
