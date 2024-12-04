import express from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();
import Certificate from "../models/certModel.js";


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
      throw new Error(error);
    }
  })
);

export default router;
