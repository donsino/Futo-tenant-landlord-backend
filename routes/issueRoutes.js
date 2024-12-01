const express = require('express');
const { createIssue, getIssues } = require('../controllers/issueController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createIssue);
router.get('/', authMiddleware, getIssues);

module.exports = router;
