const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    
    const now = new Date();

    
    const dateOptions = {
      timeZone: "Asia/Makassar",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const timeOptions = {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, 
    };

    const currentDate = new Intl.DateTimeFormat("id-ID", dateOptions).format(
      now
    );
    const currentTime = new Intl.DateTimeFormat("id-ID", timeOptions).format(
      now
    );

    
    res.setHeader("Content-Type", "application/json");

    
    res.status(200).json({
      currentDate: currentDate,
      currentTime: currentTime,
    });
  } catch (error) {
  
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Failed to process the request.",
    });
  }
});


router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found. Please check the URL or method.",
  });
});

module.exports = router;
