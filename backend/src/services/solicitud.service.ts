import * as repository from "../repositories/solicitud.repository";
import * as institucionRepository from "../repositories/institucion.repository";

export const crearSolicitud = async (

    usuarioId: number,

    body: any

) => {

    const institucion =
        await institucionRepository.buscarPorUsuario(
            usuarioId
        );

    if (!institucion) {

        throw new Error(
            "La institución no existe."
        );

    }

    return repository.crearSolicitud({

        ...body,

        institucionId: institucion.id

    });

};

export const obtenerSolicitud = (id: number) => {
    return repository.obtenerSolicitud(id);
};

export const listarSolicitudes = () => {
    return repository.listarSolicitudes();
};

export const listarSolicitudesInstitucion = (
    institucionId: number
) => {
    return repository.listarSolicitudesInstitucion(
        institucionId
    );
};

export const actualizarSolicitud = (
    id: number,
    data: any
) => {
    return repository.actualizarSolicitud(
        id,
        data
    );
};

export const eliminarSolicitud = (
    id: number
) => {
    return repository.eliminarSolicitud(id);
};