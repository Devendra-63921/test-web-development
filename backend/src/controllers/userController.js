const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User created",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const users = await User.find(req.query);

    res.status(200).json({
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      id: req.params.id
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User updated",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      id: req.params.id
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createUser,
  searchUsers,
  getUser,
  updateUser,
  deleteUser
};