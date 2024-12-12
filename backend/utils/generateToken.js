import jwt from 'jsonwebtoken';

const generateToken = () => {
  const origin = process.env.ALLOWED_ORIGIN;
  return jwt.sign({ origin }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default generateToken;
