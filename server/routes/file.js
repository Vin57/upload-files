const path = require("path");
const multer = require("multer");
const fs = require("fs");
const router = require("express").Router();
const dir_upload = "./upload"
const dir_files = "files"
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(dir_upload, dir_files));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.delete("/:filename", (req, res, next) => {
  const { filename } = req.params;
  fs.unlink(path.join(dir_upload, `${dir_files}/${filename}`), (err) => {
    res.end();
  });
});

router.post("", upload.array("f"), (req, res, next) => {
  res.end();
});

module.exports = router;
