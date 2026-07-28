import {
  crearInstitucion,
  buscarPorUsuario,
  actualizarInstitucion,
  listarInstituciones
} from "../repositories/institucion.repository";

export const crearInstitucionService = async (
  usuarioId: number,
  data: any
) => {

  const existente = await buscarPorUsuario(usuarioId);

  if (existente) {
    throw new Error("La institución ya fue creada.");
  }

  return crearInstitucion({
    usuarioId,
    ...data
  });

};

export const obtenerMiInstitucionService = async (
  usuarioId: number
) => {

  const institucion = await buscarPorUsuario(usuarioId);

  if (!institucion) {
    throw new Error("Institución no encontrada.");
  }

  return institucion;

};

export const actualizarInstitucionService = async (
  usuarioId: number,
  data: any
) => {

  return actualizarInstitucion(usuarioId, data);

};

export const listarInstitucionesService = async () => {

  return listarInstituciones();

};