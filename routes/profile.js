const express = require("express");
const db = require("../modules/db");
const verifyToken = require("../middleware/auth"); // Middleware untuk verifikasi token
const router = express.Router();

// Ambil profil berdasarkan token JWT
router.get("/profile", verifyToken, (req, res) => {
  console.log("Decoded user:", req.user); // Tambahkan log ini
  db.query(
    "SELECT name, email, age, gender FROM users WHERE id = ?",
    [req.user.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      res.status(200).json({
        error: false,
        data: results[0],
      });
    }
  );
});

// Update umur dan gender di profil
router.put("/profile", verifyToken, (req, res) => {
  const { age, gender } = req.body;

  // Validasi input
  if (age !== undefined && isNaN(age)) {
    return res
      .status(400)
      .json({ error: true, message: "Age must be a number" });
  }

  if (
    gender !== undefined &&
    !["Laki-laki", "Perempuan", "other"].includes(gender)
  ) {
    return res.status(400).json({
      error: true,
      message: "Gender ha 'Laki-laki', 'Perempuan',",
    });
  }

  db.query(
    "UPDATE users SET age = ?, gender = ? WHERE id = ?",
    [age, gender, req.user.userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      res.status(200).json({
        error: false,
        message: "Profile updated successfully",
      });
    }
  );
});

module.exports = router;
