const User = require("../models/user");


const createUser = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      phone,
      address,
      age
    } = req.body;

    if (
      id === undefined ||
      name === undefined ||
      email === undefined ||
      phone === undefined ||
      address === undefined ||
      age === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (
      String(id).trim() === "" ||
      String(name).trim() === "" ||
      String(email).trim() === "" ||
      String(phone).trim() === "" ||
      String(address).trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Fields cannot be empty"
      });
    }

    if (typeof age !== "number" || age < 1) {
      return res.status(400).json({
        success: false,
        message: "Age must be a number greater than 0"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const existingId = await User.findOne({ id });

    if (existingId) {
      return res.status(409).json({
        success: false,
        message: "ID already exists"
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const newUser = await User.create({
      id,
      name,
      email,
      phone,
      address,
      age
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const searchUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      phone
    } = req.query;

    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i"
      };
    }

    if (email) {
      filter.email = {
        $regex: email,
        $options: "i"
      };
    }

    if (phone) {
      filter.phone = {
        $regex: phone,
        $options: "i"
      };
    }

    const users = await User.find(filter).sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      address,
      age
    } = req.body;

    const existingUser = await User.findOne({ id });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (
      (name !== undefined && String(name).trim() === "") ||
      (email !== undefined && String(email).trim() === "") ||
      (phone !== undefined && String(phone).trim() === "") ||
      (address !== undefined && String(address).trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Fields cannot be empty"
      });
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format"
        });
      }

      const emailExists = await User.findOne({
        email,
        id: { $ne: id }
      });

      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        });
      }
    }

    if (age !== undefined) {
      if (typeof age !== "number" || age < 1) {
        return res.status(400).json({
          success: false,
          message: "Age must be a number greater than 0"
        });
      }
    }

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (email !== undefined) {
      updateData.email = email;
    }

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    if (address !== undefined) {
      updateData.address = address;
    }

    if (age !== undefined) {
      updateData.age = age;
    }

    // Update user
    const updatedUser = await User.findOneAndUpdate(
      { id },
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
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
