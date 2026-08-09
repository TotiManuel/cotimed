
import api from "../api/api";


/*
 * ==========================================
 * INCLUYE COTIZACIÓN
 * ==========================================
 */

export interface IncluyeCotizacion {

    id: number;

    descripcion: string;

    id_cotizacion: number;

}



/*
 * ==========================================
 * COTIZACIÓN
 * ==========================================
 */

export interface Cotizacion {

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

    solicitud?: any;

    proveedor?: {

        id: number;

        name_user: string;

        email: string;

        organizacion: string;

    };

    incluye_cotizacion?: IncluyeCotizacion[];

}



/*
 * ==========================================
 * DATOS PARA CREAR COTIZACIÓN
 * ==========================================
 */

export interface CrearCotizacionData {

    id_solicitud: number;

    id_proveedor: number;

    nombre_proveedor: string;

    precio_unitario_cotizacion: number;

    precio_total_cotizacion: number;

    plazo_entrega_dias_cotizacion: number;

    garantia_meses_cotizacion: number;

    descripcion_cotizacion: string;

    estado_cotizacion?: string;

    incluye_cotizacion?: {

        descripcion: string;

    }[];

}



/*
 * ==========================================
 * DATOS PARA ACTUALIZAR COTIZACIÓN
 * ==========================================
 */

export interface ActualizarCotizacionData {

    id_solicitud?: number;

    id_proveedor?: number;

    nombre_proveedor?: string;

    precio_unitario_cotizacion?: number;

    precio_total_cotizacion?: number;

    plazo_entrega_dias_cotizacion?: number;

    garantia_meses_cotizacion?: number;

    descripcion_cotizacion?: string;

    estado_cotizacion?: string;

    incluye_cotizacion?: {

        descripcion: string;

    }[];

}



/*
 * ==========================================
 * LISTAR TODAS LAS COTIZACIONES
 * ==========================================
 *
 * GET /api/cotizaciones
 */

export const listarCotizaciones = async (): Promise<Cotizacion[]> => {

    return await api.get(
        "/cotizaciones"
    );

};



/*
 * ==========================================
 * BUSCAR COTIZACIÓN POR ID
 * ==========================================
 *
 * GET /api/cotizaciones/:id
 */

export const buscarCotizacion = async (

    id_cotizacion: number

): Promise<Cotizacion> => {

    return await api.get(
        `/cotizaciones/${id_cotizacion}`
    );

};



/*
 * ==========================================
 * LISTAR COTIZACIONES DE UNA SOLICITUD
 * ==========================================
 *
 * GET /api/cotizaciones/solicitud/:id
 */

export const listarCotizacionesPorSolicitud = async (

    id_solicitud: number

): Promise<Cotizacion[]> => {

    return await api.get(
        `/cotizaciones/solicitud/${id_solicitud}`
    );

};



/*
 * ==========================================
 * LISTAR COTIZACIONES DE UN PROVEEDOR
 * ==========================================
 *
 * GET /api/cotizaciones/proveedor/:id
 */

export const listarCotizacionesPorProveedor = async (

    id_proveedor: number

): Promise<Cotizacion[]> => {

    return await api.get(
        `/cotizaciones/proveedor/${id_proveedor}`
    );

};



/*
 * ==========================================
 * CREAR COTIZACIÓN
 * ==========================================
 *
 * POST /api/cotizaciones
 */

export const crearCotizacion = async (

    data: CrearCotizacionData

): Promise<Cotizacion> => {

    return await api.post(

        "/cotizaciones",

        data

    );

};



/*
 * ==========================================
 * ACTUALIZAR COTIZACIÓN
 * ==========================================
 *
 * PUT /api/cotizaciones/:id
 */

export const actualizarCotizacion = async (

    id_cotizacion: number,

    data: ActualizarCotizacionData

): Promise<Cotizacion> => {

    return await api.put(

        `/cotizaciones/${id_cotizacion}`,

        data

    );

};



/*
 * ==========================================
 * ELIMINAR COTIZACIÓN
 * ==========================================
 *
 * DELETE /api/cotizaciones/:id
 */

export const eliminarCotizacion = async (

    id_cotizacion: number

): Promise<{

    mensaje: string;

}> => {

    return await api.delete(

        `/cotizaciones/${id_cotizacion}`

    );

};



/*
 * ==========================================
 * AGREGAR ELEMENTO INCLUIDO
 * ==========================================
 *
 * POST /api/cotizaciones/:id/incluye
 */

export const agregarIncluyeCotizacion = async (

    id_cotizacion: number,

    descripcion: string

): Promise<IncluyeCotizacion> => {

    return await api.post(

        `/cotizaciones/${id_cotizacion}/incluye`,

        {

            descripcion

        }

    );

};



/*
 * ==========================================
 * ELIMINAR ELEMENTO INCLUIDO
 * ==========================================
 *
 * DELETE /api/cotizaciones/incluye/:id
 */

export const eliminarIncluyeCotizacion = async (

    id: number

): Promise<{

    mensaje: string;

}> => {

    return await api.delete(

        `/cotizaciones/incluye/${id}`

    );

};
