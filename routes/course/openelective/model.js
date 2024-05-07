import mongoose from "mongoose";

const OpenElective = mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  course_faculty: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    required: true,
  },
});

export default mongoose.model("OpenElectiveCourse", OpenElective);
