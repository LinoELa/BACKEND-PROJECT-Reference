import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClientClient({
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
    /*
     * Exit the process with an error code
     * va a parar el servidor si no se conecta a la base de datos
     */
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
