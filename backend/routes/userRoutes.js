const express = require("express");
const {
  getUser,
  registerUser,
  authUser,
  updateUserProfile,
  getUserById,
  deleteUser
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(getUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUser);

module.exports = router;
