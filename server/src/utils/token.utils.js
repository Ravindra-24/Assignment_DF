import jwt from "jsonwebtoken";

export const verifyAuthToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.AUTH_SECRET);
    return payload;
  } catch (error) {
    return false;
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: "1d" });
};