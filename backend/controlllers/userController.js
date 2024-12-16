import asynHandler from 'express-async-handler';
import generateToken from '../utilities/generateToken.js';
import User from '../models/userModels.js';

// @desc  Auth user/set token
// route  POST /api/users/auth
// @access Public
const authUser = asynHandler(async (req, res) => {
  // res.status(200).json({ message: 'Auth User'});
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password');
  }
});

// @desc  Auth user/set token
// route  POST /api/users/
// @access Public
const registerUser = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(' User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

  res.status(200).json({ message: 'Register User' });
});

// @desc  Auth user/set token
// route  POST /api/users/logoutUser
// @access Private
const logoutUser = asynHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logout out' });
});

// @desc  Auth user/set token
// route  GET /api/users/auth
// @access Private
const getUserProfile = asynHandler(async (req, res) => {
  //     console.log(req.user)
  //   res.status(200).json({ message: 'getUserProfile' });
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc  Auth user/set token
// route  PUt /api/users/auth
// @access Private
const updateUserProfile = asynHandler(async (req, res) => {
  // console.log(req.user)
  //   res.status(200).json({ message: 'upadateUserProfile' });
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
