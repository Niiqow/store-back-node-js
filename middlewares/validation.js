module.exports = (req, res, next) => {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    }
    // Si los campos requeridos están presentes, permite que la solicitud continúe.
    next();
  };
  