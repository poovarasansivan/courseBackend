import express from "express";
import Faculty from "./model.js";

const router = express.Router();
router.get("/", async (request, response) => {
  try {
    const FacultyMaster = await Faculty.find({});
    return response.status(200).json(FacultyMaster);
  } catch (error) {
    console.error("Error getting data:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
