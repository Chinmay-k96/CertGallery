import jwt from 'jsonwebtoken';

const generateToken = (origin) => {
  return jwt.sign({ origin }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default generateToken;
