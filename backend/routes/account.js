const express = require("express");
const { authMiddleware } = require("../middleware");
const { getBalance, transferAmount } = require("../controllers/account");

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferAmount);

module.exports = router;