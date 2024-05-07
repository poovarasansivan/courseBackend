import express from "express";
import Elective from "./model.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!Array.isArray(request.body)) {
      return response
        .status(400)
        .send({ message: "Data must be sent as an array" });
    }

    const requiredFields = [
      "course_id",
      "course_name",
      "course_faculty",
      "department",
      "semester",
      "batch"
    ];

    const newElectiveCourses = [];
    for (const courseData of request.body) {
      const missingFields = requiredFields.filter(field => !courseData[field]);
      if (missingFields.length > 0) {
        return response.status(400).send({ message: `Missing fields in one or more courses: ${missingFields.join(', ')}` });
      }

      const newElectiveCourse = {
        course_id: courseData.course_id,
        course_name: courseData.course_name,
        course_faculty: courseData.course_faculty,
        department: courseData.department,
        semester: courseData.semester,
        batch: courseData.batch,
      };

      const createdElectiveCourse = await Elective.create(newElectiveCourse);
      newElectiveCourses.push(createdElectiveCourse);
    }

    return response.status(201).send(newElectiveCourses);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
