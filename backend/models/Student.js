const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Present'
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
