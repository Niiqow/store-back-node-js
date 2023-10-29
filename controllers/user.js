const User = require('../models/user');
const passport = require('passport');

// Registro de un nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });

    await User.register(user, password); // Utiliza Passport.js para el registro seguro

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Inicio de sesión de usuario
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la autenticación' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la autenticación' });
      }
      res.json({ message: 'Inicio de sesión exitoso', user });
    });
  })(req, res, next);
};

// Obtener detalles de un usuario autenticado
exports.getUserDetails = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Usuario no autenticado' });
  }
};

// Actualizar información de usuario autenticado
exports.updateUser = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { username, email } = req.body;
      const userId = req.user._id;

      const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });

      if (!updatedUser) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json({ message: 'Usuario actualizado con éxito', user: updatedUser });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  } else {
    res.status(401).json({ error: 'Usuario no autenticado' });
  }
};
