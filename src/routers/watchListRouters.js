// ======================= IMPORTS =========================================

import express from "express";
import { addToWatchListController } from "../controllers/watchList/addWatchListController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { removeFromWatchListController } from "../controllers/watchList/removeWatchListController.js";
import { updateWatchListController } from "../controllers/watchList/updateWatchListController.js";

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
// Todas las rutas de watchlist quedan protegidas por este middleware.
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

// Elimina un item concreto de la watchlist por su id.
router.delete("/:id", removeFromWatchListController);

// Actualizar un item concreto de la watchlist por su id.
router.put("/:id", updateWatchListController);

export default router;
