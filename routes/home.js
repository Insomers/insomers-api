const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long", // Hari dalam bahasa Indonesia (Senin, Selasa, dll.)
    year: "numeric",
    month: "long", // Nama bulan (Januari, Februari, dll.)
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Format 24 jam
  });

  res.json({
    
    currentDate: ` ${currentDate}`,
    currentTime: ` ${currentTime}`,
    
  });
});

module.exports = router;
