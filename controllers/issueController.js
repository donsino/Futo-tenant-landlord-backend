const db = require('../config');

const reportIssue = async (req, res) => {
    const { user_id, issue } = req.body;

    try {
        await db.query('INSERT INTO issues (user_id, issue) VALUES (?, ?)', [user_id, issue]);
        res.status(201).json({ message: 'Issue reported successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getIssues = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM issues');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { reportIssue, getIssues };
