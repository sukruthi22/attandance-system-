const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Present', 'Absent', 'Late']
  }
}, { timestamps: true });

const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceRecordSchema);
module.exports = AttendanceRecord;
