const Student = require('../models/Student');

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  const { rollNo, name, className, status } = req.body;

  try {
    const studentExists = await Student.findOne({ rollNo });

    if (studentExists) {
      return res.status(400).json({ message: 'Student with this Roll No already exists' });
    }

    const student = await Student.create({
      rollNo,
      name,
      className,
      status
    });

    res.status(201).json({
      message: 'Student added',
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      student.rollNo = req.body.rollNo || student.rollNo;
      student.name = req.body.name || student.name;
      student.className = req.body.className || student.className;
      student.status = req.body.status || student.status;

      const updatedStudent = await student.save();
      res.json({
        message: 'Student updated',
        student: updatedStudent
      });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      await student.deleteOne();
      res.json({ message: 'Student deleted' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStudents, addStudent, updateStudent, deleteStudent };
