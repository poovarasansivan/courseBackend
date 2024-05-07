import express from "express";
import Electivecoursemodel from "../course/elective/model.js";

const router = express.Router();

router.get("/:semester/:department", async (request, response) => {
  try {
    const { semester, department } = request.params;

    const courses = await Electivecoursemodel.find({ semester, department }).select(
      "course_id course_name"
    );

    if (courses.length === 0) {
      return response
        .status(404)
        .send({ message: `No courses found for semester ${semester} and department ${department}` });
    }

    return response.status(200).send(courses);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
