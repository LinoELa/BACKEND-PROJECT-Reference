// ======================= IMPORTS =========================================

import jwt from "jsonwebtoken";

// ======================= GENERAR TOKEN ===================================

/**
 * Utilidad para generar JWT.
 * Este archivo recibe el id del usuario y devuelve un token firmado
 * usando JWT_SECRET desde las variables de entorno.
 * Si recibe `res`, tambien puede guardar el token en una cookie httpOnly.
 *
 * @GENERATE_TOKEN | JWT by user id
 *
 */

const generateToken = (userId, res) => {
  const payload = {
    id: userId,
  };

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT_SECRET no esta definido en el archivo .env");
  }

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  };

  const token = jwt.sign(payload, secretKey, options);

  if (res) {
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  return token;
};

export { generateToken };
