const router = require("express").Router();

const sample = require("./sample");
const file = require("./file");

router.use("/api/sample", sample);
router.use("/api/files", file);

module.exports = router;
