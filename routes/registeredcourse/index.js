import express from "express";
import RegisterCourse from "../registeredcourse/model.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.rollno ||
      !request.body.name ||
      !request.body.academic_year ||
      !request.body.semester ||
      !request.body.department ||
      !request.body.honours ||
      !request.body.electivecourse_1 ||
      !request.body.electivecourse_2 ||
      !request.body.open_electivecourse
    ) {
      return response
        .status(400)
        .send({ message: "send all the required feilds" });
    }
    const newRegisteration = {
      rollno: request.body.rollno,
      name: request.body.name,
      academic_year: request.body.academic_year,
      semester: request.body.semester,
      department: request.body.department,
      honours: request.body.honours,
      electivecourse_1: request.body.electivecourse_1,
      electivecourse_2: request.body.electivecourse_2,
      open_electivecourse: request.body.open_electivecourse,
      addon_course: request.body.addon_course,
    };
    const newRegisterationrecord = await RegisterCourse.create(
      newRegisteration
    );
    return response.status(201).send(newRegisterationrecord);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
export default router;
