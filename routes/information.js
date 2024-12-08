const express = require("express");
const router = express.Router();

// Endpoint untuk menampilkan informasi
router.get("/", (req, res) => {
  res.json({
    title: "Informasi Aplikasi",
    description:
      "Aplikasi ini membantu memantau pola tidur dan memberikan kuis terkait kesehatan tidur.",
    version: "1.0.0",
    developer: "Tim Pengembang",
  });
});

module.exports = router;
