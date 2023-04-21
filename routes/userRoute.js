const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/alluser", UserController.allUser);

module.exports = router;