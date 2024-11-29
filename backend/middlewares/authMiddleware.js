import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded !== process.env.USER_PIN){
        throw new Error()
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorised!! token failed');
    }
  } else {
    res.status(404);
    throw new Error('Token not found');
  }
};