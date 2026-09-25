const express = require("express");

const {
  createUser,
  searchUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();


router.post("/", createUser);


router.get("/search", searchUsers);


router.get("/:id", getUser);


router.patch("/:id", updateUser);


router.delete("/:id", deleteUser);


module.exports = router;
