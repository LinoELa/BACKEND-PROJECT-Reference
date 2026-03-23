const express = require("express");
const port = 3000;

import dotenv from "dotenv";

import movieRouters from "./routers/movieRouters.js";
import { connectDB } from "./src/config/db.js";

// ======================= dotenv ================================

dotenv.config();
connectDB();

// =======================API ROUTES ================================

const app = express();
app.use("/movies", movieRouters);

// ======================= Iniciar el servidor =====================

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// ======================= VALIDACION PARA TODOS LOS PROYECECTOS DE NODE  =====================

/*
 * Handle unhandled promise rejections (e.g., database connection errors)
 **** Gestionar los rechazos de promesas no controlados (por ejemplo, errores de conexión a la base de datos)
 */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

/**
 * Handle uncaught exceptions
 **** Gestionar excepciones no detectadas
 */

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

/*
 * Graceful shutdown
 ****  Apagado controlado
 */
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
