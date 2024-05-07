import express from "express";
import RegisteredCourse from "../registeredcourse/model.js";
import CoreSubject from "../course/coresubject/model.js";
import Faculty from "../faculty/model.js"; // Import the Faculty model

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

    // Convert registeredCourses to a plain JavaScript object
    const registeredCoursesObj = registeredCourses.toObject();

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
      ...registeredCoursesObj, // Spread the properties of registeredCourses
    };
    coreSubjects.forEach((subject, index) => {
      assignedCourses[`course_id${index + 1}`] = subject.course_id;
      assignedCourses[`course_name${index + 1}`] = subject.course_name;
    });

    // Fetch faculty names for all courses and associate them with respective course names
    const facultyData = {};
    const coursesToFetch = [
      ...Object.values(registeredCoursesObj),
      ...coreSubjects.map((subject) => subject.course_name),
    ];
    for (const course of coursesToFetch) {
      let courseName;
      if (typeof course === "string") {
        courseName = course;
      } else if (course && course.course_name) {
        courseName = course.course_name;
      }
      if (courseName) {
        const faculty = await Faculty.findOne({ course: courseName });
        const facultyName = faculty ? faculty.faculty_name : "Not Assigned";
        facultyData[`faculty_name_${courseName.replace(/\s+/g, '_').toLowerCase()}`] = facultyName;
      }
    }

    // Merge faculty data with assigned courses
    Object.assign(assignedCourses, facultyData);

    return response.status(200).send({ assignedcourses: [assignedCourses] });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
