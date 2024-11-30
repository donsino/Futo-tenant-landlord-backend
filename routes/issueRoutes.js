const express = require('express');
const { reportIssue, getIssues } = require('../controllers/issueController');
const router = express.Router();

router.post('/report', reportIssue);
router.get('/', getIssues);

module.exports = router;
