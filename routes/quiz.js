const express = require("express");
const connection = require("../modules/db");
const router = express.Router();

// Get questions
router.get("/questions", (req, res) => {
  const query = "SELECT * FROM questions";
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.json(results);
  });
});

// Submit answers
router.post("/answers", (req, res) => {
  const answers = req.body.answers;
  const userId = req.body.userId;

  // Example save logic
  const query = "INSERT INTO answers (user_id, answers) VALUES (?, ?)";
  connection.query(query, [userId, JSON.stringify(answers)], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.json({ message: "Answers submitted successfully!" });
  });
});

module.exports = router;
