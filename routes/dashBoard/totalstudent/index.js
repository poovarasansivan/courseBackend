import express from "express";
import StudentDetails from "../../../studentMaster/model.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const totalStudents = await StudentDetails.countDocuments();
    response.status(200).json({ totalStudents });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
