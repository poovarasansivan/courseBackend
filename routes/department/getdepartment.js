import express from "express";
import Department from "./model.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const studentMaster = await Department.find({});
    const departmentNames = studentMaster.map((department) => department.department_name);
    return response.status(200).json(departmentNames);
  } catch (error) {
    console.error("Error getting data:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
