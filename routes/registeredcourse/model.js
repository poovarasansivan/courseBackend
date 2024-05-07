import mongoose from "mongoose";

const CourseRegistration = mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  academic_year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  honours: {
    type: String,
    required: true,
  },
  electivecourse_1: {
    type: String,
    required: true,
  },
  electivecourse_2: {
    type: String,
    required: true,
  },
  open_electivecourse: {
    type: String,
    required: true,
  },
  addon_course: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Registeredcourse", CourseRegistration);
