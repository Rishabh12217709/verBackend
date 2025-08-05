// backend/routes/journalRoutes.js
const express = require("express");
const router = express.Router();
const {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalController");
const auth = require("../middleware/auth");

router.post("/", auth, createJournal);
router.get("/", auth, getJournals);
router.put("/:id", auth, updateJournal);
router.delete("/:id", auth, deleteJournal);

module.exports = router;
