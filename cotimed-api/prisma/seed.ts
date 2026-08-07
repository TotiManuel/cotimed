import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existeAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@cotimed.com",
    },
  });

  if (existeAdmin) {
    console.log("El administrador ya existe.");
    return;
  }

  const password = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name_user: "Administrador",
      email: "admin@cotimed.com",
      password,
      rol: Role.admin,
      organizacion: "CotiMed",
    },
  });

  console.log("Administrador creado correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });