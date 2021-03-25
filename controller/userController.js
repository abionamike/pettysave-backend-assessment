/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const {
      first_name, last_name, address, email, password,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      first_name, last_name, address, email, password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};