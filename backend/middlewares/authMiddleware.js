import jwt from "jsonwebtoken";

export const verfiyToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export const authenticate = (req, res, next) => {
  let { usertoken } = req.cookies;
  console.log("usertoken - ", usertoken)
  if (usertoken) {
    try {
      if (!verfiyToken(usertoken)) {
        throw new Error("Invalid Token");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised!! token failed");
    }
  } else {
    res.status(404);
    throw new Error("Token not found");
  }
};
