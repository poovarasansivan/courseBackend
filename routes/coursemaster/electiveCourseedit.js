import express from "express";
import Electivecourse from "../course/elective/model.js";
const router = express.Router();

router.put("/:id", async (request, response) => {
  try {
    const { id: course_id } = request.params;
    if (!course_id) {
      return response
        .status(404)
        .send({ message: "Course Id is required in the URL parameter" });
    }
    const result = await Electivecourse.findOneAndUpdate(
      { course_id: course_id },
      { $set: request.body },
      { new: true }
    );
    if (!result) {
      return response.status(404).send({ message: "Course not found" });
    }
    return response.status(200).send({
      message: "Course details updated successfully",
      student: result,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
