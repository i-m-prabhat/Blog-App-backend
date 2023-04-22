const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/alluser", UserController.allUser);
router.get("/articles/:email", UserController.articleUser)

module.exports = router;