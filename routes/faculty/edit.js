import express from "express";
import Faculty from "./model.js";
const router = express.Router();

router.put("/:id", async (request, response) => {
  try {
    const { id: faculty_id } = request.params;
    if (!faculty_id) {
      return response
        .status(404)
        .send({ message: "Facult id number is required in the URL parameter" });
    }
    const result = await Faculty.findOneAndUpdate(
      { faculty_id: faculty_id },
      { $set: request.body },
      { new: true }
    );
    if (!result) {
      return response.status(404).send({ message: "Faculty not found" });
    }
    return response.status(200).send({
      message: "Student details updated successfully",
      student: result,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
