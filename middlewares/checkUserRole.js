const checkUserRole = (requiredRole) => (req, res, next) => {
  // Obtén el usuario autenticado desde el token (puedes hacerlo en tu middleware de autenticación)
  const user = req.user;
  // Verifica si el usuario tiene el rol necesario
  if (user && user.role === requiredRole) {
    // Si el usuario tiene el rol adecuado, permite el acceso a la ruta
    next();
  } else {
    // Si el usuario no tiene el rol adecuado, devuelve un error
    return res
      .status(403)
      .json({ message: "Acceso denegado. Rol requerido: " + requiredRole });
  }
};

module.exports = checkUserRole ;
