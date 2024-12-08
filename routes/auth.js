const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../modules/db"); // koneksi database
const router = express.Router();

// Register Endpoint
router.post("/register", async (req, res) => {
  const { name, email, password, age, gender } = req.body;

  // Validasi input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Name, email, and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query =
      "INSERT INTO users (name, email, password, age, gender) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        name,
        email,
        hashedPassword,
        age || null, // Null jika tidak diisi
        gender || null, // Null jika tidak diisi
      ],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: true, message: "Email already exists" });
          }
          return res.status(500).json({ error: true, message: err.message });
        }

        res.status(201).json({ error: false, message: "User Created" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: true, message: "Server error" });
  }
});

// Login Endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: true, message: err.message });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET || "insomers-sekret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      error: false,
      message: "Success",
      loginResult: {
        userId: user.id,
        name: user.name,
        token,
      },
    });
  });
});

module.exports = router;
