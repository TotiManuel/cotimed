
import api from "../api/api";


/*
 * Institución relacionada
 */
export interface InstitucionSolicitud {

    id: number;

    name_user: string;

    email: string;

    organizacion: string;

}


/*
 * Cotización relacionada
 */
export interface CotizacionSolicitud {

    id_cotizacion: number;

    id_solicitud: number;

    id_proveedor: number;

    nombre_proveedor: string;

    precio_unitario_cotizacion: number;

    precio_total_cotizacion: number;

    plazo_entrega_dias_cotizacion: number;

    garantia_meses_cotizacion: number;

    descripcion_cotizacion: string;

    estado_cotizacion: string;

    fecha_envio_cotizacion: string;

}


/*
 * Solicitud
 */
export interface Solicitud {

    id_solicitud: number;

    titulo_solicitud: string;

    equipamiento_solicitud: string;

    descripcion_solicitud: string;

    cantidad_solicitud: number;

    urgencia_solicitud: string;

    estado_solicitud: string;

    fecha_creacion_solicitud: string;

    id_institucion: number;

    nombre_institucion: string;

    especificaciones_solicitud: string;

    presupuesto_estimado_solicitud: number;

    institucion?: InstitucionSolicitud;

    cotizaciones?: CotizacionSolicitud[];

}


/*
 * Datos para crear una solicitud
 *
 * estado_solicitud es opcional porque
 * el backend utiliza "pendiente" por defecto.
 */
export interface CrearSolicitudData {

    titulo_solicitud: string;

    equipamiento_solicitud: string;

    descripcion_solicitud: string;

    cantidad_solicitud: number;

    urgencia_solicitud: string;

    id_institucion: number;

    nombre_institucion: string;

    especificaciones_solicitud: string;

    presupuesto_estimado_solicitud: number;

    estado_solicitud?: string;

}


/*
 * Datos para actualizar una solicitud
 */
export interface ActualizarSolicitudData {

    titulo_solicitud?: string;

    equipamiento_solicitud?: string;

    descripcion_solicitud?: string;

    cantidad_solicitud?: number;

    urgencia_solicitud?: string;

    estado_solicitud?: string;

    id_institucion?: number;

    nombre_institucion?: string;

    especificaciones_solicitud?: string;

    presupuesto_estimado_solicitud?: number;

}

/*
 * LISTAR TODAS LAS SOLICITUDES
 *
 * GET /api/solicitudes
 */
export const listarSolicitudes = async (): Promise<Solicitud[]> => {

    return await api.get(
        "/solicitudes"
    );

};


/*
 * BUSCAR SOLICITUD POR ID
 *
 * GET /api/solicitudes/:id
 */
export const buscarSolicitud = async (
    id: number
): Promise<Solicitud> => {

    return await api.get(
        `/solicitudes/${id}`
    );

};


/*
 * LISTAR SOLICITUDES DE UNA INSTITUCIÓN
 *
 * GET /api/solicitudes/institucion/:id
 */
export const listarSolicitudesPorInstitucion = async (
    id_institucion: number
): Promise<Solicitud[]> => {

    return await api.get(
        `/solicitudes/institucion/${id_institucion}`
    );

};


/*
 * CREAR SOLICITUD
 *
 * POST /api/solicitudes
 */
export const crearSolicitud = async (
    data: CrearSolicitudData
): Promise<Solicitud> => {

    return await api.post(
        "/solicitudes",
        data
    );

};


/*
 * ACTUALIZAR SOLICITUD
 *
 * PUT /api/solicitudes/:id
 */
export const actualizarSolicitud = async (
    id: number,
    data: ActualizarSolicitudData
): Promise<Solicitud> => {

    return await api.put(
        `/solicitudes/${id}`,
        data
    );

};


/*
 * ELIMINAR SOLICITUD
 *
 * DELETE /api/solicitudes/:id
 */
export const eliminarSolicitud = async (
    id: number
): Promise<{
    mensaje: string;
}> => {

    return await api.delete(
        `/solicitudes/${id}`
    );

};
