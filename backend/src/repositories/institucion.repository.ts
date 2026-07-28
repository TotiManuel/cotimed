import { prisma } from "../config/database";

export const crearInstitucion = (data: any) => {
    return prisma.institucion.create({
        data
    });
};

export const buscarPorUsuario = (usuarioId: number) => {
    return prisma.institucion.findUnique({
        where: {
            usuarioId
        },
        include: {
            usuario: true
        }
    });
};

export const actualizarInstitucion = (
    usuarioId: number,
    data: any
) => {

    return prisma.institucion.update({

        where: {
            usuarioId
        },

        data

    });

};

export const listarInstituciones = () => {

    return prisma.institucion.findMany({

        include: {
            usuario: true
        }

    });

};