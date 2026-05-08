const AttendanceRecord = require('../models/AttendanceRecord');
const Student = require('../models/Student');

const saveAttendance = async (req, res) => {
  const { attendance } = req.body;

  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Save records
    const recordsToInsert = attendance.map(item => ({
      rollNo: item.rollNo,
      name: item.name,
      date: today,
      status: item.markedStatus
    }));

    // Delete existing records for today to allow overwrite
    await AttendanceRecord.deleteMany({ date: today });
    await AttendanceRecord.insertMany(recordsToInsert);

    // Update student statuses
    for (let item of attendance) {
      await Student.findOneAndUpdate(
        { rollNo: item.rollNo },
        { status: item.markedStatus }
      );
    }

    const records = await AttendanceRecord.find({});

    res.status(201).json({
      message: 'Attendance saved successfully',
      records
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecords = async (req, res) => {
  try {
    const records = await AttendanceRecord.find({});
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveAttendance, getRecords };
