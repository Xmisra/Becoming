import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve("uploads");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();

    cb(null, `${Date.now()}-${safeName}${ext}`)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }

    cb(null, true);
  },
});

export default upload;
