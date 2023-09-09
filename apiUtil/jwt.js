import jwt from 'jsonwebtoken';

export const jwtSign = async (payload, SECRET, option = {}) => jwt.sign(payload, SECRET, option);

export const jwtVerify = async (token, SECRET) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return false;
  }
};
