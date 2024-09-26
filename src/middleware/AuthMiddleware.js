export const authMiddleware = (req, res, next) => {
    // Dummy middleware untuk autentikasi
    const isAuthenticated = sessionStorage.getItem('auth');
    if (isAuthenticated) {
      return next();
    } else {
      res.redirect('/login');
    }
  };