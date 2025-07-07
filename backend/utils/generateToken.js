import jwt from 'jsonwebtoken';

const generateToken = (origin) => {
  console.log("origin to generate token = ", origin)
  return jwt.sign({ origin }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default generateToken;
