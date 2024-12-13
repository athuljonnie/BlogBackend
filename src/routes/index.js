const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin.route"));
router.use("/", require("./image.route"));
router.use("/", require("./post.route"));
router.use("/", require("./newsUpdate.route"));
router.use("/", require("./supportDocument.route"));


module.exports = router;
