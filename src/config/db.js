// ======================= IMPORTS =========================================

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// ======================= DATABASE CONFIG =================================

/**
 * Configuracion de base de datos con Prisma.
 * Este archivo crea la conexion a PostgreSQL y exporta
 * la instancia de Prisma para reutilizarla en el proyecto.
 *
 * @DATABASE | Prisma + PostgreSQL
 *
 */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Disconnected from the database successfully.");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
    process.exit(1);
  }
};

export { prisma, connectDB, disconnectDB };
