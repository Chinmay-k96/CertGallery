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
      throw new Error("Somthing went wrong - " + error);
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
      throw new Error("Somthing went wrong" + error);
    }
  })
);

//update user - private/admin
router.patch(
  "/:id",
  authenticate,
  expressAsyncHandler(async (req, res) => {
    try {
      const certificate = await Certificate.findById({ _id: req.params.id });

      if (certificate) {
        Object.keys(req?.body)?.map((key) => {
          certificate[key] = req?.body?.[key];
        });

        const updatedCertificate = await certificate.save();

        res.send(updatedCertificate);
      } else {
        res.status(404);
        throw new Error("Certificate not found");
      }
    } catch (error) {
      res.status(500);
      throw new Error("Somthing went wrong" + error);
    }
  })
);

export default router;
