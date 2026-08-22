import {
    PrismaClient,
    RolUsuario,
    EstadoUsuario,
} from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    console.log("Iniciando seed...");

    // =========================================================
    // BUSCAR ADMINISTRADOR
    // =========================================================

    const existeAdmin = await prisma.usuario.findUnique({
        where: {
            email: "admin@cotimed.com",
        },
    });

    // =========================================================
    // SI YA EXISTE
    // =========================================================

    if (existeAdmin) {
        console.log("El administrador ya existe.");
        return;
    }

    // =========================================================
    // ENCRIPTAR CONTRASEÑA
    // =========================================================

    const password = await bcrypt.hash("123456", 10);

    // =========================================================
    // CREAR ADMINISTRADOR
    // =========================================================

    const admin = await prisma.usuario.create({
        data: {
            nombre: "Administrador",

            apellido: "CotiMed",

            email: "admin@cotimed.com",

            password: password,

            rol: RolUsuario.ADMIN,

            estado: EstadoUsuario.ACTIVO,

            email_verificado: true,
        },
    });

    // =========================================================
    // RESULTADO
    // =========================================================

    console.log("Administrador creado correctamente.");
    console.log({
        id: admin.id,
        nombre: admin.nombre,
        email: admin.email,
        rol: admin.rol,
        estado: admin.estado,
    });
}

main()

    .catch((error) => {

        console.error(
            "Error ejecutando seed:",
            error
        );

        process.exit(1);

    })

    .finally(async () => {

        await prisma.$disconnect();

    });