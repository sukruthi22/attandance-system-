const express = require('express');
const router = express.Router();
const { saveAttendance, getRecords } = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(saveAttendance);

router.route('/records')
  .get(getRecords);

module.exports = router;
