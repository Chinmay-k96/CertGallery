import express from "express";
import path from "path";
import multer from "multer";
import expressAsyncHandler from "express-async-handler";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();
import Certificate from "../models/certModel.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Only images are allowed!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  "/",
  authenticate,
  expressAsyncHandler(async (req, res) => {
    try {
      const { filename, content } = req.body;

      const certificate = await Certificate.create({
        filename: filename,
        content: content,
      });

      res.json({
        message: "Certificate uploaded sucessfully",
        data: certificate,
      });
    } catch (error) {
      res.status(500);
      throw new Error("Somthing went wrong" + error);
    }
  })
);

export default router;
