import mongoose from "mongoose";

const Faculty = mongoose.Schema({
  faculty_id: {
    type: String,
    required: true,
  },
  faculty_name: {
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
  level: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Facultys", Faculty);
