import {
    PrismaClient,
    RolUsuario,
    EstadoUsuario,
    TipoDocumento,
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
            nombre: "Julian",
            apellido: "Mandaio",
            email: "admin@cotimed.com",
            password: password,
            telefono: "353-5654443",
            tipo_documento: TipoDocumento.DNI,
            numero_documento: "41.323.167",
            pais: "Argentina",
            provincia : "Cordoba",
            ciudad : "Villa Maria",
            rol: RolUsuario.ADMIN
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