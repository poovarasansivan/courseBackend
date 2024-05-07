import express from "express";
import Registeredcourse from "../registeredcourse/model.js";
import CoreSubjects from "../course/coresubject/model.js";
import HonoursCourses from "../course/honours/model.js";

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const registeredCourses = await Registeredcourse.find({});

    const result = await Promise.all(registeredCourses.map(async (course) => {
      const coreSubjects = await CoreSubjects.find({ semester: course.semester }, { course_name: 1, _id: 0 });
      
      const responseObj = {
        ...course.toObject(),
      };

      coreSubjects.forEach((subject, index) => {
        responseObj[`coreSubject${index + 1}`] = subject.course_name;
      });

      // If the course is marked as 'honours', fetch the corresponding honours courses
      if (course.honours == 'YES') {
        const honoursCourses = await HonoursCourses.find({ semester: course.semester });
        if (honoursCourses.length > 0) {
          honoursCourses.forEach((honoursCourse, index) => {
            responseObj[`honoursCourses${index + 1}`] = honoursCourse.course_name;
          });
        } else {
          // If no honours courses found, assign "Not Applicable" to the first honours course field
          responseObj[`honoursCourses1`] = "Not Applicable";
        }
      } else {
        // If not marked as 'honours', assign "Not Applicable" to the first honours course field
        responseObj[`honoursCourses1`] = "Not Applicable";
      }

      return responseObj;
    }));

    response.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
