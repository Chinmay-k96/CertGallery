import jwt from "jsonwebtoken";

export const verfiyToken = (tokenString, origin) => {
  try {
    const token = tokenString?.split(' ')?.[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("origin from headers = ", origin)
    console.log("origin decoded from jwt = ", decoded)
    if(decoded?.origin === origin){
      return true;
    }else{
      return false
    }
  } catch (error) {
    return false;
  }
};

export const authenticate = (req, res, next) => {
  const { authorization, origin } = req.headers;
  if (authorization) {
    try {
      if (!verfiyToken(authorization, origin)) {
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
