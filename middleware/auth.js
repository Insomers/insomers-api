const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Ambil header Authorization
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: true, message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: true, message: "Token missing" });
  }

  jwt.verify(token, "insomers-sekret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: true, message: "Invalid token" });
    }

    req.user = decoded; // Tambahkan data pengguna ke req
    next(); // Lanjutkan ke middleware berikutnya
  });
};

module.exports = verifyToken;
