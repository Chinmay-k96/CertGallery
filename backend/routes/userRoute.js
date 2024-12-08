import express from "express";
const router = express.Router();
import generateToken from "../utils/generateToken.js";

//login  - public
router.post("/login", (req, res) => {
  const { mpin } = req.body;
  console.log("mpin", mpin)
  console.log("USER_PIN", process.env.USER_PIN)
  if (Number(mpin) === Number(process.env.USER_PIN)) {
    const token = generateToken(mpin);
    res.cookie("usertoken", token, {
      httpOnly: false,     // Makes the cookie inaccessible via JavaScript
      secure: true,       // Ensures the cookie is sent over HTTPS
      sameSite: "None",   // Required for cross-origin cookies
    });
    res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.send("Login successfull");
  } else {
    res.status(401);
    throw new Error("Invalid Pin");
  }
});

export default router;