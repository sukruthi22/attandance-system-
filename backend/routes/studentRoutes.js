const express = require('express');
const router = express.Router();
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getStudents) // Frontend doesn't send token yet in GET requests, we can protect it later if needed or leave it open
  .post(addStudent);

router.route('/:id')
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
