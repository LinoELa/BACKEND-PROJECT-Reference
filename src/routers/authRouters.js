// ======================= IMPORTS =========================================

import express from "express";
import { register } from "../controllers/auth/registerController.js";
import { login } from "../controllers/auth/loginController.js";
import { logout } from "../controllers/auth/logoutController.js";

// =======================Expess ===========================

/**
 * imnpotamos express Router para definir rutas de autenticacion
 * @ROUTER | Express Router
 */

const router = express.Router();

// ======================= AUTHENTICATION ROUTES ============================

/**
 * Rutas de autenticacion.
 * Este archivo define los endpoints publicos para registrar usuarios
 * e iniciar sesion dentro del modulo de auth.
 *
 * @REGISTER | POST /api/auth/register
 * @LOGIN | POST /api/auth/login
 * @LOGOUT | POST /api/auth/logout
 *
 */
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
