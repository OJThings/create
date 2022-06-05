const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");

const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ user: req.user._id });
  res.json(reports);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const createReport = asyncHandler(async (req, res) => {
  const {
    ans1,
    ans2,
    ans3,
    desc,
    inctype,
    status,
    ques1,
    ques2,
    ques3,
    titledesc,
    uid,
    pic,
    header,
  } = req.body;

  const report = new Report({
    user: req.user._id,
    ans1,
    ans2,
    ans3,
    desc,
    inctype,
    status,
    ques1,
    ques2,
    ques3,
    titledesc,
    uid,
    pic,
    header
  });

  const createdReport = await report.save();

  res.status(201).json(createdReport);
});
const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report) {
    res.json(report);
  } else {
    res.status(404).json({ message: "report not found" });
  }

  res.json(report);
});

const updateReport = asyncHandler(async (req, res) => {
  const { ans1, ans2, ans3, desc, status } = req.body;

  const report = await Report.findById(req.params.id);

  if (report.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (report) {
    report.ans1 = ans1;
    report.ans2 = ans2;
    report.ans3 = ans3;
    report.desc = desc;
    report.status = status;

    const updatedReport = await report.save();
    res.json(updatedReport);
  } else {
    res.status(404);
    throw new Error("Report not found");
  }
});

const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (report) {
    await report.remove();
    res.json({ message: "report Removed" });
  } else {
    res.status(404);
    throw new Error("report not Found");
  }
});
module.exports = {
  getReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
};
