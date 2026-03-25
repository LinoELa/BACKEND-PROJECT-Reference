// ======================= IMPORTS =========================================

import express from "express";

const router = express.Router();

// ======================= MOVIE ROUTES ====================================

/**
 * Rutas de peliculas.
 * Este archivo concentra endpoints de ejemplo para probar
 * operaciones HTTP basicas sobre el recurso movie.
 *
 * @ROUTES | /movies
 *
 */

router.get("/", (req, res) => {
  res.json({ httpMethos: "GET" });
});

router.post("/", (req, res) => {
  res.json({ httpMethos: "POST" });
});

router.delete("/", (req, res) => {
  res.json({ httpMethos: "DELETE" });
});

router.put("/", (req, res) => {
  res.json({ httpMethos: "PUT" });
});

export default router;
