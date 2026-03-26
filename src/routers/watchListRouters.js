// ======================= IMPORTS =========================================

import express from "express";
import { addToWatchListController } from "../controllers/watchList/watchListController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// ======================= EXPRESS ROUTER ==================================

/**
 * Importamos Express Router para definir rutas de watchlist.
 * @ROUTER | Express Router
 */

const router = express.Router();

// ======================= WATCHLIST MIDDLEWARE ============================

/**
 * Antes de llegar a las rutas de watchlist,
 * pasamos por el middleware de autenticacion.
 *
 * La idea es que solo un usuario autenticado
 * pueda trabajar con su watchlist.
 *
 * @MIDDLEWARE | authMiddleware
 *
 */
router.use(authMiddleware);

// ======================= WATCHLIST ROUTES ================================

/**
 * Rutas de watchlist.
 * Este archivo define endpoints para gestionar peliculas
 * dentro de la lista personal del usuario.
 *
 * @WATCHLIST | POST /api/watchlist
 *
 */
// Agrega una pelicula a la watchlist del usuario.
router.post("/", addToWatchListController);

export default router;
