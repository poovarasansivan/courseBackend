import express from "express";
import AddOnCourse from "./model.js";

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

    const newAddonCourses = [];
    for (const courseData of request.body) {
      const missingFields = requiredFields.filter(field => !courseData[field]);
      if (missingFields.length > 0) {
        return response.status(400).send({ message: `Missing fields in one or more courses: ${missingFields.join(', ')}` });
      }

      const newAddonCourse = {
        course_id: courseData.course_id,
        course_name: courseData.course_name,
        course_faculty: courseData.course_faculty,
        department: courseData.department,
        semester: courseData.semester,
        batch: courseData.batch,
      };

      const createdAddonCourse = await AddOnCourse.create(newAddonCourse);
      newAddonCourses.push(createdAddonCourse);
    }

    return response.status(201).send(newAddonCourses);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
