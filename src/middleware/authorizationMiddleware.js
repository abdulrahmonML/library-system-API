const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRole = user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden: Insufficient permissions",
      });
    }
    next();
  };
};

module.exports = roleMiddleware;
