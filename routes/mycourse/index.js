import express from "express";
import RegisteredCourse from "../registeredcourse/model.js";
import CoreSubject from "../course/coresubject/model.js";

const router = express.Router();

router.get("/:rollno/:semester", async (request, response) => {
  try {
    const { rollno, semester } = request.params;

    // Fetch the registered courses for the given roll number
    const registeredCourses = await RegisteredCourse.findOne({ rollno }).select(
      "electivecourse_1 electivecourse_2 open_electivecourse addon_course"
    );
    if (!registeredCourses) {
      return response
        .status(404)
        .send({ message: `No courses found for roll number ${rollno}` });
    }

    // Fetch all the core subjects for the given semester
    const coreSubjects = await CoreSubject.find({ semester }).select(
      "course_id course_name"
    );

    if (coreSubjects.length == 0) {
      return response
        .status(404)
        .send({ message: `No core subjects found for semester ${semester}` });
    }

    // Group core subjects by roll number and semester
    const assignedCourses = {
      _id: rollno,
      ...registeredCourses.toObject(),
    };
    coreSubjects.forEach((subject, index) => {
      assignedCourses[`course_id${index + 1}`] = subject.course_id;
      assignedCourses[`course_name${index + 1}`] = subject.course_name;
    });

    return response.status(200).send({ assignedcourses: [assignedCourses] });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
