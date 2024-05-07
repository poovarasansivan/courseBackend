import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  sgpa: {
    type: String,
    required: true,
  },
  arrears: {
    type: String,
    required: true,
  },
  honours: {
    type: String,
    required: false,
  },
  minours: {
    type: String,
    required: false,
  }
});

export default mongoose.model("StudentDetails", studentSchema);
