import express from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticate, verfiyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();
import Certificate from "../models/certModel.js";

//get all certificates - private/admin
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      let { usertoken } = req.cookies;
      const isLoggedIn = verfiyToken(usertoken);
      const certificates = await Certificate.find({}).sort({ createdAt: -1 });
      res.json({ isLoggedIn: isLoggedIn, data: certificates });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  })
);

//delete a user - private/admin
router.delete(
  "/:id",
  authenticate,
  expressAsyncHandler(async (req, res) => {
    try {
      await Certificate.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "Certificate deleted" });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  })
);

//update user - private/admin
router.patch(
  "/:id",
  authenticate,
  expressAsyncHandler(async (req, res) => {
    try {
      await Certificate.findByIdAndUpdate({ _id: req.params.id }, req?.body);
      res.send("certificate updated");
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  })
);

export default router;
