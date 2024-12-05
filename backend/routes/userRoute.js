import express from "express";
const router = express.Router();
import generateToken from "../utils/generateToken.js";

//login  - public
router.post("/login", (req, res) => {
  const { mpin } = req.body;

  if (Number(mpin) === Number(process.env.USER_PIN)) {
    const token = generateToken(mpin);
    res.cookie("usertoken", token);
    res.send("Login successfull");
  } else {
    res.status(401);
    throw new Error("Invalid Pin");
  }
});

export default router;