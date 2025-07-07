import express from "express";
const router = express.Router();
import generateToken from "../utils/generateToken.js";

//login  - public
router.post("/login", (req, res) => {
  const { mpin } = req.body;
  const origin = req.headers.origin;
  const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(",") || [];

  // If the request's Origin is in your allowlist, echo it back
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  if (Number(mpin) === Number(process.env.USER_PIN)) {
    const token = generateToken();
    res.json({message:"Login successfull", token:token});
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

export default router;