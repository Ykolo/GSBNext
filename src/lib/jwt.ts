import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (user: { login: string; password: string }) => {
  return jwt.sign(
    { login: user.login, password: user.password },
    SECRET_KEY as string,
    {
      expiresIn: "10d",
    }
  );
};
