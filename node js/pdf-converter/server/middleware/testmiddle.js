function auth(req, res, next) {
  try {
    const jwt_token = req.headers.authorization;

    //varify the jwt token here!
    next();
  } catch (err) {
    res.status(500).json({ message: "Interal Server error" });
  }
}

export default { auth };
