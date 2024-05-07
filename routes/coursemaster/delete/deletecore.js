import express from "express";
import CoreSubject from "../../course/coresubject/model.js";
const router = express.Router();

router.delete("/:id", async (request, response) => {
  try {
    const { id: course_id } = request.params;
    if (!course_id) {
      return response.status(404).send({ Message: "Course Id is required in the URL parameter" });
    }
    const result = await CoreSubject.findOneAndDelete({ course_id: course_id });
    if (!result) {
      return response.status(404).send({ message: "Student not found" });
    }
    return response
      .status(200)
      .send({ message: "Student deleted Successfully" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
