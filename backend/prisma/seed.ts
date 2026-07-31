import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  console.log("=================================");
  console.log("Seed ejecutado correctamente.");
  console.log("No hay datos para cargar.");
  console.log("=================================");

}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });