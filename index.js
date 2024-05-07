import express, { request, response } from "express";
import { PORT, monogoDBURL } from "./config.js";
import mongoose from "mongoose";
import AddUser from "./studentMaster/adduser/index.js";
import StudentRecord from "./studentMaster/index.js";
import UpdateStudent from "./studentMaster/edit/index.js";
import DeleteStudent from "./studentMaster/delete/index.js";
import TotalStudent from "./routes/dashBoard/totalstudent/index.js";
import Addcourse from "./routes/course/coresubject/addcourse.js";
import AddonCourse from "./routes/course/addon/index.js";
import ElectiveCourse from "./routes/course/elective/addelectivecourse.js";
import HonoursCourse from "./routes/course/honours/addhonours.js";
import Minours from "./routes/course/minors/addminors.js";
import OpenElective from "./routes/course/openelective/addopenelective.js";
import Department from "./routes/department/index.js";
import DepartmentCount from "./routes/dashBoard/totaldepartment/index.js";
import TotalOpenElectivecount from "./routes/dashBoard/totalopenelective/index.js";
import TotalElective from "./routes/dashBoard/totalelective/index.js";
import RegisterCourse from "./routes/registeredcourse/index.js";
import ElectiveCourseOption from "./routes/electivecourseoption/index.js";
import AddOnCourseOption from "./routes/addonoption/index.js";
import OpenElectiveOption from "./routes/openelectiveoption/index.js";
import AssignedCourse from "./routes/mycourse/index.js";
import AddFaculty from "./routes/faculty/addfaculty.js";
import GetFaculty from "./routes/faculty/getfaculty.js";
import EditAssignedCourse from "./routes/registeredcourse/editcourse.js";
import Editcourse from "./routes/faculty/edit.js";
import OverallRegisteredcorse from "./routes/mycourse/overallcourse.js";
import DeleteFaculty from "./routes/faculty/delete.js";
import DepartmentOption from "./routes/department/getdepartment.js";
import Coursemaster from "./routes/course/index.js";
import EditCoresubject from "./routes/coursemaster/coreSubjectEdit.js";
import EditAddoncourse from "./routes/coursemaster/addonedit.js";
import EditOpenelective from "./routes/coursemaster/openelective.js";
import EditElective from "./routes/coursemaster/electiveCourseedit.js";
import EditHonours from "./routes/coursemaster/honours.js";
import EditMinours from "./routes/coursemaster/minours.js";
import DeleteCore from "./routes/coursemaster/delete/deletecore.js";
import DeleteOpenelective from "./routes/coursemaster/delete/deleteopenelective.js";
import DeleteElective from "./routes/coursemaster/delete/deleteelective.js";
import DeleteAddoncourse from "./routes/coursemaster/delete/deleteaddon.js";
import DeletHonours from "./routes/coursemaster/delete/deletehonours.js";
import DelteMinours from "./routes/coursemaster/delete/deleteminor.js";
import AddcoreSubject from "./routes/coursemaster/addcourse/addcoresubject.js";
import AddelectiveSubject from "./routes/coursemaster/addcourse/addelective.js";
import AddopenelectiveSubject from "./routes/coursemaster/addcourse/addopenelective.js";
import AddonCourseSubject from "./routes/coursemaster/addcourse/addadoncours.js";
import GetStudent from "./routes/auth/index.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors()); // Use cors middleware
app.use("/getdata", StudentRecord);
app.use("/adduser", AddUser);
app.use("/userupdate", UpdateStudent);
app.use("/deleteuser", DeleteStudent);
app.use("/totalstudent", TotalStudent);
app.use("/addcourse", Addcourse);
app.use("/newAddonCourse", AddonCourse);
app.use("/AddElective", ElectiveCourse);
app.use("/AddHonours", HonoursCourse);
app.use("/AddMinours", Minours);
app.use("/AddOpenElective", OpenElective);
app.use("/department", Department);
app.use("/getdepartment", DepartmentOption);
app.use("/departmentcount", DepartmentCount);
app.use("/openelectivecount", TotalOpenElectivecount);
app.use("/totalElectivecount", TotalElective);
app.use("/registerCourse", RegisterCourse);
app.use("/electivecourseoption", ElectiveCourseOption);
app.use("/addoncourseoption", AddOnCourseOption);
app.use("/openelectiveoption", OpenElectiveOption);
app.use("/myassignedcourse", AssignedCourse);
app.use("/editassignedcourse", EditAssignedCourse);
app.use("/addfaculty", AddFaculty);
app.use("/getfaculty", GetFaculty);
app.use("/editfaculty", Editcourse);
app.use("/overallregisteredcourse", OverallRegisteredcorse);
app.use("/deletefaculty", DeleteFaculty);
app.use("/coursemaster", Coursemaster);
app.use("/editcoresubject", EditCoresubject);
app.use("/editaddoncourse", EditAddoncourse);
app.use("/editopenelective", EditOpenelective);
app.use("/editelective", EditElective);
app.use("/edithonours", EditHonours);
app.use("/editminours", EditMinours);
app.use("/deletecoresubject", DeleteCore);
app.use("/deleteaddoncourse", DeleteAddoncourse);
app.use("/deleteopenelective", DeleteOpenelective);
app.use("/deleteelective", DeleteElective);
app.use("/delethonours", DeletHonours);
app.use("/deleteminours", DelteMinours);
app.use("/addcoresubject", AddcoreSubject);
app.use("/addelectivesubject", AddelectiveSubject);
app.use("/addopenelectivesubject", AddopenelectiveSubject);
app.use("/addonCourseSubject", AddonCourseSubject);
app.use("/getStudent", GetStudent);

app.get("/", (request, response) => {
  return response.status(200).send("Welcome");
});

mongoose
  .connect(monogoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is running on Port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
