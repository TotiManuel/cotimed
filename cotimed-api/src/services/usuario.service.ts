// cotimed-api/src/services/usuario.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoDocumento,
    RolUsuario,
    EstadoUsuario,
} from "@prisma/client";


// =========================================================
// SERVICE: USUARIO
// =========================================================


// =========================================================
// LISTAR TODAS LAS USUARIOS
// =========================================================

export const listarUsuarios = async () => {

    return await prisma.usuario.findMany({

        where: {
            eliminado: false,
        },

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
            solicitudes_creadas: true,
            cotizaciones: true,
            mensajes_enviados: true,
            notificaciones: true,
            auditorias: true,
            favoritos: true,
            archivos: true,
        },
    });
};


// =========================================================
// BUSCAR USUARIO POR ID
// =========================================================

export const buscarUsuario = async (
    id: number
) => {

    const usuario =
        await prisma.usuario.findUnique({

            where: {
                id: id,
            },

            include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
            solicitudes_creadas: true,
            cotizaciones: true,
            mensajes_enviados: true,
            notificaciones: true,
            auditorias: true,
            favoritos: true,
            archivos: true,
        },
        });

    if (!usuario) {

        throw new Error(
            "Usuario no encontrado"
        );
    }

    return 
        usuario;
};


// =========================================================
// CREAR USUARIO
// =========================================================

export const crearUsuario = async (data: {

        nombre: string;
        apellido?: string;
        email: string;
        password: string;
        telefono?: string;
        tipo_documento?: TipoDocumento;
        numero_documento?: string;
        rol: RolUsuario;
        estado?: EstadoUsuario;
        avatar_url?: string;
        ultimo_login?: Date;
        email_verificado?: boolean;
        institucion_id?: number;
        proveedor_id?: number;
        eliminado?: boolean;

        solicitudes_creadas?: {
            numero: string;
            titulo: string;
            descripcion: string;
            institucion_id: number;
            creado_por_id: number;
            estado?: EstadoSolicitud;
            urgencia?: NivelUrgencia;
            fecha_publicacion?: Date;
            fecha_limite_cotizacion?: Date;
            fecha_cierre?: Date;
            presupuesto_estimado?: number;
            moneda?: TipoMoneda;
            condiciones?: string;
            observaciones?: string;
            lugar_entrega?: string;
            requiere_instalacion?: boolean;
            requiere_capacitacion?: boolean;
            eliminado?: boolean;
        }[];

        cotizaciones?: {
            numero: string;
            solicitud_id: number;
            proveedor_id: number;
            usuario_id: number;
            estado?: EstadoCotizacion;
            moneda?: TipoMoneda;
            subtotal: number;
            impuestos?: number;
            descuento?: number;
            envio?: number;
            total: number;
            plazo_entrega_dias?: number;
            garantia_meses?: number;
            validez_dias?: number;
            fecha_vencimiento?: Date;
            condiciones_pago?: TipoPago;
            condiciones?: string;
            observaciones?: string;
            fecha_envio?: Date;
        }[];

        mensajes_enviados?: {
            solicitud_id?: number;
            cotizacion_id?: number;
            remitente_id: number;
            tipo?: TipoMensaje;
            contenido: string;
            estado?: EstadoMensaje;
            fecha_lectura?: Date;
        }[];

        notificaciones?: {
            usuario_id: number;
            tipo: TipoNotificacion;
            titulo: string;
            mensaje: string;
            url?: string;
            leida?: boolean;
            fecha_lectura?: Date;
        }[];

        auditorias?: {
            usuario_id?: number;
            tipo: TipoAuditoria;
            entidad: string;
            entidad_id?: number;
            accion: string;
            descripcion?: string;
            datos_anteriores?: any;
            datos_nuevos?: any;
            ip?: string;
            user_agent?: string;
        }[];

        favoritos?: {
            equipamento_id: number;
            usuario_id?: number;
            institucion_id?: number;
            proveedor_id?: number;
        }[];

        archivos?: {
            nombre: string;
            nombre_original?: string;
            url: string;
            tipo_mime?: string;
            extension?: string;
            tamanio_bytes?: number;
            tipo: TipoDocumentoArchivo;
            usuario_id?: number;
            solicitud_id?: number;
            cotizacion_id?: number;
        }[];

}) => {

    // =====================================================
    // VERIFICAR INSTITUCION
    // =====================================================

    const institucion =
        await prisma.institucion.findUnique({

            where: {
                id: data.institucion_id,
            },
        });

    if (!institucion) {

        throw new Error(
            "El institucion no existe"
        );
    }

    // =====================================================
    // VERIFICAR PROVEEDOR
    // =====================================================

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: data.proveedor_id,
            },
        });

    if (!proveedor) {

        throw new Error(
            "El proveedor no existe"
        );
    }

    return await prisma.usuario.create({

        data: {

            nombre:
                data.nombre,

            apellido:
                data.apellido,

            email:
                data.email,

            password:
                data.password,

            telefono:
                data.telefono,

            tipo_documento:
                data.tipo_documento,

            numero_documento:
                data.numero_documento,

            rol:
                data.rol,

            estado:
                data.estado,

            avatar_url:
                data.avatar_url,

            ultimo_login:
                data.ultimo_login,

            email_verificado:
                data.email_verificado,

            institucion_id:
                data.institucion_id,

            proveedor_id:
                data.proveedor_id,

            eliminado:
                data.eliminado,

            solicitudes_creadas: {
                create:
                    data.solicitudes_creadas.map((item) => ({
                        numero:
                            item.numero,
                        titulo:
                            item.titulo,
                        descripcion:
                            item.descripcion,
                        institucion_id:
                            item.institucion_id,
                        creado_por_id:
                            item.creado_por_id,
                        estado:
                            item.estado,
                        urgencia:
                            item.urgencia,
                        fecha_publicacion:
                            item.fecha_publicacion,
                        fecha_limite_cotizacion:
                            item.fecha_limite_cotizacion,
                        fecha_cierre:
                            item.fecha_cierre,
                        presupuesto_estimado:
                            item.presupuesto_estimado,
                        moneda:
                            item.moneda,
                        condiciones:
                            item.condiciones,
                        observaciones:
                            item.observaciones,
                        lugar_entrega:
                            item.lugar_entrega,
                        requiere_instalacion:
                            item.requiere_instalacion,
                        requiere_capacitacion:
                            item.requiere_capacitacion,
                        eliminado:
                            item.eliminado,
                    })),
            },
            cotizaciones: {
                create:
                    data.cotizaciones.map((item) => ({
                        numero:
                            item.numero,
                        solicitud_id:
                            item.solicitud_id,
                        proveedor_id:
                            item.proveedor_id,
                        usuario_id:
                            item.usuario_id,
                        estado:
                            item.estado,
                        moneda:
                            item.moneda,
                        subtotal:
                            item.subtotal,
                        impuestos:
                            item.impuestos,
                        descuento:
                            item.descuento,
                        envio:
                            item.envio,
                        total:
                            item.total,
                        plazo_entrega_dias:
                            item.plazo_entrega_dias,
                        garantia_meses:
                            item.garantia_meses,
                        validez_dias:
                            item.validez_dias,
                        fecha_vencimiento:
                            item.fecha_vencimiento,
                        condiciones_pago:
                            item.condiciones_pago,
                        condiciones:
                            item.condiciones,
                        observaciones:
                            item.observaciones,
                        fecha_envio:
                            item.fecha_envio,
                    })),
            },
            mensajes_enviados: {
                create:
                    data.mensajes_enviados.map((item) => ({
                        solicitud_id:
                            item.solicitud_id,
                        cotizacion_id:
                            item.cotizacion_id,
                        remitente_id:
                            item.remitente_id,
                        tipo:
                            item.tipo,
                        contenido:
                            item.contenido,
                        estado:
                            item.estado,
                        fecha_lectura:
                            item.fecha_lectura,
                    })),
            },
            notificaciones: {
                create:
                    data.notificaciones.map((item) => ({
                        usuario_id:
                            item.usuario_id,
                        tipo:
                            item.tipo,
                        titulo:
                            item.titulo,
                        mensaje:
                            item.mensaje,
                        url:
                            item.url,
                        leida:
                            item.leida,
                        fecha_lectura:
                            item.fecha_lectura,
                    })),
            },
            auditorias: {
                create:
                    data.auditorias.map((item) => ({
                        usuario_id:
                            item.usuario_id,
                        tipo:
                            item.tipo,
                        entidad:
                            item.entidad,
                        entidad_id:
                            item.entidad_id,
                        accion:
                            item.accion,
                        descripcion:
                            item.descripcion,
                        datos_anteriores:
                            item.datos_anteriores,
                        datos_nuevos:
                            item.datos_nuevos,
                        ip:
                            item.ip,
                        user_agent:
                            item.user_agent,
                    })),
            },
            favoritos: {
                create:
                    data.favoritos.map((item) => ({
                        equipamento_id:
                            item.equipamento_id,
                        usuario_id:
                            item.usuario_id,
                        institucion_id:
                            item.institucion_id,
                        proveedor_id:
                            item.proveedor_id,
                    })),
            },
            archivos: {
                create:
                    data.archivos.map((item) => ({
                        nombre:
                            item.nombre,
                        nombre_original:
                            item.nombre_original,
                        url:
                            item.url,
                        tipo_mime:
                            item.tipo_mime,
                        extension:
                            item.extension,
                        tamanio_bytes:
                            item.tamanio_bytes,
                        tipo:
                            item.tipo,
                        usuario_id:
                            item.usuario_id,
                        solicitud_id:
                            item.solicitud_id,
                        cotizacion_id:
                            item.cotizacion_id,
                    })),
            },
        },

        include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
            solicitudes_creadas: true,
            cotizaciones: true,
            mensajes_enviados: true,
            notificaciones: true,
            auditorias: true,
            favoritos: true,
            archivos: true,
        },
    });
};


// =========================================================
// ACTUALIZAR USUARIO
// =========================================================

export const actualizarUsuario = async (

    id: number,

    data: {

        nombre?: string;
        apellido?: string | null;
        email?: string;
        password?: string;
        telefono?: string | null;
        tipo_documento?: TipoDocumento | null;
        numero_documento?: string | null;
        rol?: RolUsuario;
        estado?: EstadoUsuario;
        avatar_url?: string | null;
        ultimo_login?: Date | null;
        email_verificado?: boolean;
        institucion_id?: number | null;
        proveedor_id?: number | null;
        eliminado?: boolean;

    },

) => {

    const usuario =
        await prisma.usuario.findUnique({

            where: {
                id: id,
            },
        });

    if (!usuario) {

        throw new Error(
            "Usuario no encontrado"
        );
    }

    return await prisma.usuario.update({

        where: {
            id: id,
        },

        data,

        include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
            solicitudes_creadas: true,
            cotizaciones: true,
            mensajes_enviados: true,
            notificaciones: true,
            auditorias: true,
            favoritos: true,
            archivos: true,
        },
    });
};


// =========================================================
// ELIMINAR USUARIO
// =========================================================

export const eliminarUsuario = async (
    id: number
) => {

    const usuario =
        await prisma.usuario.findUnique({

            where: {
                id: id,
            },
        });

    if (!usuario) {

        throw new Error(
            "Usuario no encontrado"
        );
    }

    return await prisma.usuario.update({

        where: {
            id: id,
        },

        data: {
            eliminado: true,
        },
    });
};