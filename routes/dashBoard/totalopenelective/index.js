import express from "express";
import Openelective from "../../course/openelective/model.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const totalOpenelective = await Openelective.countDocuments();
    response.status(200).json({ totalOpenelective });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
