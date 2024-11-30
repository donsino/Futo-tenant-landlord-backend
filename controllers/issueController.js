const Issue = require('../routes/issueRoutes');

exports.createIssue = async (req, res) => {
  try {
    const { description } = req.body;
    const issue = await Issue.create({ description, user: req.user.id });
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('user');
    res.status(200).json(issues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};