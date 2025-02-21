const express = require("express");
const { saveUser, findUser } = require("../controllers/userController");
const router = express.Router();

router.post("/user", saveUser);
router.get("/user/:id", findUser);

module.exports = router;
