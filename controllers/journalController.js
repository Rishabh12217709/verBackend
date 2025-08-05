// backend/controllers/journalController.js
const Journal = require("../models/Journal");

const createJournal = async (req, res) => {
  const { title, content } = req.body;
  try {
    const journal = new Journal({
      user: req.user,
      title,
      content,
    });
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateJournal = async (req, res) => {
  const { title, content } = req.body;
  try {
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, content },
      { new: true }
    );
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteJournal = async (req, res) => {
  try {
    await Journal.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json({ msg: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createJournal, getJournals, updateJournal, deleteJournal };
