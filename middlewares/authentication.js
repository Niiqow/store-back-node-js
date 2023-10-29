module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, permite que la solicitud continúe.
      return next();
    }
    // Si el usuario no está autenticado, devuelve un error de no autorizado.
    res.status(401).json({ error: 'No autorizado' });
  };
  