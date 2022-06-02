const express = require("express");
const {
  getReportById,
  getReports,
  createReport,
  deleteReport,
  updateReport,
} = require("../controllers/reportController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");

router.route("/").get(protect, getReports);
router.route("/create").post(protect, createReport);
router
  .route("/:id")
  .get(getReportById)
  .put(protect, updateReport)
  .delete(protect, deleteReport);

// router.route("/:id").get().put().delete();

module.exports = router;
