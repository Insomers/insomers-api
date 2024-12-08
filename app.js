const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const homeRouter = require("./routes/home");
const quizRouter = require("./routes/quiz");
const profileRouter = require("./routes/profile");
const informationRouter = require("./routes/information.js");
const authRoutes = require("./routes/auth");


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Register routes
app.get("/", (req, res) => {
  res.send("api succes");
});
app.use("/api/auth", authRoutes);
app.use("/home", homeRouter);
app.use("/quiz", quizRouter);
app.use("/profile", profileRouter);
app.use("/information", informationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
