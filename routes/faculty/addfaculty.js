import express from "express";
import Faculty from "./model.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!Array.isArray(request.body)) {
      return response
        .status(400)
        .send({ message: "Data must be sent as an array" });
    }

    const newFaculty = [];
    for (const data of request.body) {
      if (
        !data.faculty_id ||
        !data.faculty_name ||
        !data.email ||
        !data.department ||
        !data.level ||
        !data.course
      ) {
        return response.status(400).send({
          message:
            "All faculties must have faculty_id, faculty_name, email, department, level, and course",
        });
      }
      const newFacultyData = await Faculty.create({
        faculty_id: data.faculty_id,
        faculty_name: data.faculty_name,
        email: data.email,
        department: data.department,
        level: data.level,
        course: data.course,
      });
      newFaculty.push(newFacultyData);
    }

    return response.status(201).send(newFaculty);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
