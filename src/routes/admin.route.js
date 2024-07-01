const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const { authenticate, logger } = require("../middlewares/authentication.middleware");

router.post('/admin-login', controller.adminLogIn);
router.post('/validate-token', authenticate, logger, (req, res) => {res.json({ valid: true });});


module.exports = router;
