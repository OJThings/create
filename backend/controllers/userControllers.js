const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find(req.params.id);
  if (users) {
    res.json(users);
  } else {
    res.status(404).json({ message: "users not found" });
  }
  res.json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const {
    fname,
    mname,
    lname,
    email,
    studentnumber,
    yearsection,
    username,
    password,
    pic,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fname,
    mname,
    lname,
    email,
    studentnumber,
    yearsection,
    username,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      mname: user.mname,
      lname: user.lname,
      username: user.username,
      studentnumber: user.studentnumber,
      yearsection: user.yearsection,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      mname: user.mname,
      lname: user.lname,
      username: user.username,
      studentnumber: user.studentnumber,
      yearsection: user.yearsection,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fname = req.body.fname || user.fname;
    user.mname = req.body.mname || user.mname;
    user.lname = req.body.lname || user.lname;
    user.yearsection = req.body.yearsection || user.yearsection;
    user.studentnumber = req.body.studentnumber || user.studentnumber;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      mname: updatedUser.mname,
      lname: updatedUser.lname,
      username: updatedUser.username,
      studentnumber: updatedUser.studentnumber,
      yearsection: updatedUser.yearsection,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // if (user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (user) {
    await user.remove();
    res.json({ message: "report Removed" });
  } else {
    res.status(404);
    throw new Error("report not Found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }

  res.json(user);
});

module.exports = { getUser, registerUser, authUser, updateUserProfile, deleteUser, getUserById };
