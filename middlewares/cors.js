const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://tudominio.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

module.exports = cors(corsOptions);
