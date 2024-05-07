import express from "express";
import Department from "./model.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!Array.isArray(request.body)) {
      return response
        .status(400)
        .send({ message: "Data must be sent as an array" });
    }

    const newDepartments = [];
    for (const data of request.body) {
      if (!data.department_id || !data.department_name) {
        return response
          .status(400)
          .send({
            message:
              "All departments must have department_id and department_name",
          });
      }
      const newDepartment = await Department.create({
        department_id: data.department_id,
        department_name: data.department_name,
      });
      newDepartments.push(newDepartment);
    }

    return response.status(201).send(newDepartments);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
