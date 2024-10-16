const userController = require("../controllers/UserController");

const express = require("express");
const router = express.Router();

router.post("/", userController.createUser);

module.exports = router;
