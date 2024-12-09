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
      httpOnly: true,     // Makes the cookie inaccessible via JavaScript
      secure: true,       // Ensures the cookie is sent over HTTPS
      sameSite: "Lax",   // Required for cross-origin cookies
      maxAge: 1000 * 60 * 60 * 24 * 2,
      path: "/api",
      domain: process.env.ALLOWED_DOMAIN
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