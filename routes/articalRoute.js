const express = require("express");
const ArticalController = require("../controllers/ArticalController.js");
const router = express.Router();

router.get("/articles", ArticalController.getArtical);
router.post("/articles", ArticalController.createArtical);
router.put("/articles/:id", ArticalController.editArtical);
router.get("/articles/one/:id", ArticalController.getSingleArticle);
router.get('/articles/user/:userId', ArticalController.getArticlesByUser);
router.delete("/articles/:id", ArticalController.deleteArtical);
router.post("/articles/:id/comments", ArticalController.createComment);
router.get("/articles/:id/comments", ArticalController.getComment);

module.exports = router;