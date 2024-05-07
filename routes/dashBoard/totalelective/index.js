import express from "express";
import Elective from "../../course/elective/model.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const totalelective = await Elective.countDocuments();
    response.status(200).json({ totalelective });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
