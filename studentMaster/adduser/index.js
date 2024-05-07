import express, { request, response } from "express";
import StudentDetails from "../model.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.rollno ||
      !request.body.name ||
      !request.body.email ||
      !request.body.department ||
      !request.body.batch
    ) {
      return response
        .status(400)
        .send({ message: "send all the required feilds" });
    }
    const newUser = {
      rollno: request.body.rollno,
      name: request.body.name,
      email: request.body.email,
      department: request.body.department,
      batch: request.body.batch,
      role: 1,
      semester:request.body.semester,
      year:request.body.year,
      sgpa:request.body.sgpa,
      arrears:request.body.arrears,
      honours:request.body.honours,
      minours:request.body.minours,
    };
    const newStudent = await StudentDetails.create(newUser);
    return response.status(201).send(newStudent);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
export default router;
