import jwt from 'jsonwebtoken';

const secret = "ZwVyd#q*b}_@>fb}_@>f__a1234as°-.as<<<-.";

const createToken = (payload) => {
  const token = jwt.sign(payload, secret);
  return token;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

export { createToken, validateToken };
