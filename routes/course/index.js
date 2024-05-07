import express from "express";
import CorseSubject from "./coresubject/model.js";
import AddonSubject from "./addon/model.js";
import Electivecourse from "./elective/model.js";
import Openelective from "./openelective/model.js";
import Honours from "./honours/model.js";
import Minors from "./minors/model.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const courseSubjects = await CorseSubject.find();
    const addonSubjects = await AddonSubject.find();
    const electiveCourses = await Electivecourse.find();
    const openElectives = await Openelective.find();
    const honours = await Honours.find();
    const minors = await Minors.find();

    const courseSubjectsMapped = courseSubjects.map((doc) => ({
      ...doc.toObject(),
      coursetype: "Coresubject",
    }));
    const addonSubjectsMapped = addonSubjects.map((doc) => ({
      ...doc.toObject(),
      coursetype: "Addon Course",
    }));
    const electiveCoursesMapped = electiveCourses.map((doc) => ({
      ...doc.toObject(),
      coursetype: "Elective Course",
    }));
    const openElectivesMapped = openElectives.map((doc) => ({
      ...doc.toObject(),
      coursetype: "Openelective Course",
    }));
    const honoursMapped = honours.map((doc) => ({
      ...doc.toObject(),
      coursetype: "Honours Course",
    }));
    const minorsMapped = minors.map((doc) => ({
      ...doc.toObject(),
      coursetype: "Minors Course",
    }));

    const allCourses = [
      ...courseSubjectsMapped,
      ...addonSubjectsMapped,
      ...electiveCoursesMapped,
      ...openElectivesMapped,
      ...honoursMapped,
      ...minorsMapped,
    ];

    response.json({ courses: allCourses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

export default router;
