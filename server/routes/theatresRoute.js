const router = require("express").Router();
const authMiddleware = require("../middlwares/authMiddleware");
const Theatre = require("../models/theatreModel");

// add theatre
router.post("/add-theatre", authMiddleware, async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
    });
  }
});

// get all theatres
router.get("/get-all-theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
    });
  }
});


module.exports = router;