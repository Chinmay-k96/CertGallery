import express from "express";
const router = express.Router();
import generateToken from "../utils/generateToken.js";

//login  - public
router.post("/login", (req, res) => {
  const { mpin } = req.body;
  if (Number(mpin) === Number(process.env.USER_PIN)) {
    const token = generateToken();
    res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.json({message:"Login successfull", token:token});
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

export default router;