// cotimed-api/src/services/usuario.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import bcrypt from "bcrypt";

import {
    TipoDocumento,
    RolUsuario,
    EstadoUsuario,
    EstadoSolicitud,
    NivelUrgencia,
    TipoMoneda,
    EstadoCotizacion,
    TipoPago,
    TipoMensaje,
    EstadoMensaje,
    TipoNotificacion,
    TipoAuditoria,
    TipoDocumentoArchivo,
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


    return usuario;

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


    // =====================================================
    // SOLICITUDES
    // =====================================================

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


    // =====================================================
    // COTIZACIONES
    // =====================================================

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


    // =====================================================
    // MENSAJES
    // =====================================================

    mensajes_enviados?: {

        solicitud_id?: number;

        cotizacion_id?: number;

        remitente_id: number;

        tipo?: TipoMensaje;

        contenido: string;

        estado?: EstadoMensaje;

        fecha_lectura?: Date;

    }[];


    // =====================================================
    // NOTIFICACIONES
    // =====================================================

    notificaciones?: {

        usuario_id: number;

        tipo: TipoNotificacion;

        titulo: string;

        mensaje: string;

        url?: string;

        leida?: boolean;

        fecha_lectura?: Date;

    }[];


    // =====================================================
    // AUDITORIAS
    // =====================================================

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


    // =====================================================
    // FAVORITOS
    // =====================================================

    favoritos?: {

        equipamento_id: number;

        usuario_id?: number;

        institucion_id?: number;

        proveedor_id?: number;

    }[];


    // =====================================================
    // ARCHIVOS
    // =====================================================

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
    // VERIFICAR EMAIL
    // =====================================================

    const usuarioExistente =
        await prisma.usuario.findUnique({

            where: {

                email:
                    data.email,

            },

        });


    if (usuarioExistente) {

        throw new Error(
            "Ya existe un usuario registrado con ese email"
        );

    }


    // =====================================================
    // VERIFICAR INSTITUCION
    // =====================================================

    if (
        data.institucion_id !== undefined &&
        data.institucion_id !== null
    ) {

        const institucion =
            await prisma.institucion.findUnique({

                where: {

                    id:
                        data.institucion_id,

                },

            });


        if (!institucion) {

            throw new Error(
                "La institucion no existe"
            );

        }

    }


    // =====================================================
    // VERIFICAR PROVEEDOR
    // =====================================================

    if (
        data.proveedor_id !== undefined &&
        data.proveedor_id !== null
    ) {

        const proveedor =
            await prisma.proveedor.findUnique({

                where: {

                    id:
                        data.proveedor_id,

                },

            });


        if (!proveedor) {

            throw new Error(
                "El proveedor no existe"
            );

        }

    }


    // =====================================================
    // VALIDAR RELACION CON INSTITUCION / PROVEEDOR
    // =====================================================

    if (
        data.rol === RolUsuario.INSTITUCION &&
        !data.institucion_id
    ) {

        throw new Error(
            "Un usuario con rol INSTITUCION debe pertenecer a una institucion"
        );

    }


    if (
        data.rol === RolUsuario.PROVEEDOR &&
        !data.proveedor_id
    ) {

        throw new Error(
            "Un usuario con rol PROVEEDOR debe pertenecer a un proveedor"
        );

    }


    if (
        data.rol === RolUsuario.ADMIN &&
        (
            data.institucion_id !== undefined ||
            data.proveedor_id !== undefined
        )
    ) {

        throw new Error(
            "Un usuario ADMIN no puede pertenecer a una institucion o proveedor"
        );

    }


    // =====================================================
    // VERIFICAR QUE NO PERTENEZCA A AMBOS
    // =====================================================

    if (
        data.institucion_id !== undefined &&
        data.institucion_id !== null &&
        data.proveedor_id !== undefined &&
        data.proveedor_id !== null
    ) {

        throw new Error(
            "Un usuario no puede pertenecer simultaneamente a una institucion y a un proveedor"
        );

    }


    // =====================================================
    // HASHEAR PASSWORD
    // =====================================================

    const passwordHash =
        await bcrypt.hash(
            data.password,
            12
        );


    // =====================================================
    // CREAR USUARIO
    // =====================================================

    const usuario =
        await prisma.usuario.create({

            data: {

                nombre:
                    data.nombre,

                apellido:
                    data.apellido,

                email:
                    data.email,

                password:
                    passwordHash,

                telefono:
                    data.telefono,

                tipo_documento:
                    data.tipo_documento,

                numero_documento:
                    data.numero_documento,

                rol:
                    data.rol,

                estado:
                    data.estado ??
                    EstadoUsuario.ACTIVO,

                avatar_url:
                    data.avatar_url,

                ultimo_login:
                    data.ultimo_login,

                email_verificado:
                    data.email_verificado ??
                    false,

                institucion_id:
                    data.institucion_id,

                proveedor_id:
                    data.proveedor_id,

                eliminado:
                    data.eliminado ??
                    false,

            },

        });


    // =====================================================
    // RETORNAR USUARIO SIN PASSWORD
    // =====================================================

    const {
        password: _password,
        ...usuarioSinPassword
    } = usuario;


    return usuarioSinPassword;

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


    // =====================================================
    // BUSCAR USUARIO
    // =====================================================

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


    // =====================================================
    // VERIFICAR EMAIL
    // =====================================================

    if (
        data.email &&
        data.email !== usuario.email
    ) {

        const emailExistente =
            await prisma.usuario.findUnique({

                where: {

                    email:
                        data.email,

                },

            });


        if (emailExistente) {

            throw new Error(
                "Ya existe un usuario registrado con ese email"
            );

        }

    }


    // =====================================================
    // VERIFICAR INSTITUCION
    // =====================================================

    if (
        data.institucion_id !== undefined &&
        data.institucion_id !== null
    ) {

        const institucion =
            await prisma.institucion.findUnique({

                where: {

                    id:
                        data.institucion_id,

                },

            });


        if (!institucion) {

            throw new Error(
                "La institucion no existe"
            );

        }

    }


    // =====================================================
    // VERIFICAR PROVEEDOR
    // =====================================================

    if (
        data.proveedor_id !== undefined &&
        data.proveedor_id !== null
    ) {

        const proveedor =
            await prisma.proveedor.findUnique({

                where: {

                    id:
                        data.proveedor_id,

                },

            });


        if (!proveedor) {

            throw new Error(
                "El proveedor no existe"
            );

        }

    }


    // =====================================================
    // NO PERMITIR AMBAS RELACIONES
    // =====================================================

    const institucionId =
        data.institucion_id !== undefined
            ? data.institucion_id
            : usuario.institucion_id;

    const proveedorId =
        data.proveedor_id !== undefined
            ? data.proveedor_id
            : usuario.proveedor_id;


    if (
        institucionId !== null &&
        institucionId !== undefined &&
        proveedorId !== null &&
        proveedorId !== undefined
    ) {

        throw new Error(
            "Un usuario no puede pertenecer simultaneamente a una institucion y a un proveedor"
        );

    }


    // =====================================================
    // VALIDAR ROL
    // =====================================================

    const rolFinal =
        data.rol ??
        usuario.rol;


    if (
        rolFinal === RolUsuario.INSTITUCION &&
        !institucionId
    ) {

        throw new Error(
            "Un usuario con rol INSTITUCION debe pertenecer a una institucion"
        );

    }


    if (
        rolFinal === RolUsuario.PROVEEDOR &&
        !proveedorId
    ) {

        throw new Error(
            "Un usuario con rol PROVEEDOR debe pertenecer a un proveedor"
        );

    }


    if (
        rolFinal === RolUsuario.ADMIN &&
        (
            institucionId !== null &&
            institucionId !== undefined ||
            proveedorId !== null &&
            proveedorId !== undefined
        )
    ) {

        throw new Error(
            "Un usuario ADMIN no puede pertenecer a una institucion o proveedor"
        );

    }


    // =====================================================
    // PREPARAR DATOS
    // =====================================================

    const datosActualizacion: any = {

        nombre:
            data.nombre,

        apellido:
            data.apellido,

        email:
            data.email,

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

    };


    // =====================================================
    // PASSWORD
    // =====================================================

    if (
        data.password !== undefined &&
        data.password.trim() !== ""
    ) {

        datosActualizacion.password =
            await bcrypt.hash(
                data.password,
                12
            );

    }


    // =====================================================
    // ELIMINAR UNDEFINED
    // =====================================================

    Object.keys(
        datosActualizacion
    ).forEach((key) => {

        if (
            datosActualizacion[key] ===
            undefined
        ) {

            delete datosActualizacion[key];

        }

    });


    // =====================================================
    // ACTUALIZAR
    // =====================================================

    const usuarioActualizado =
        await prisma.usuario.update({

            where: {

                id: id,

            },

            data:
                datosActualizacion,

        });


    // =====================================================
    // RETORNAR SIN PASSWORD
    // =====================================================

    const {
        password: _password,
        ...usuarioSinPassword
    } = usuarioActualizado;


    return usuarioSinPassword;

};


// =========================================================
// ELIMINAR USUARIO
// =========================================================

export const eliminarUsuario = async (
    id: number
) => {


    // =====================================================
    // VERIFICAR USUARIO
    // =====================================================

    const usuario =
        await prisma.usuario.findUnique({

            where: {

                id:
                    id,

            },

        });


    if (!usuario) {

        throw new Error(
            "Usuario no encontrado"
        );

    }


    // =====================================================
    // ELIMINACION LOGICA
    // =====================================================

    const usuarioEliminado =
        await prisma.usuario.update({

            where: {

                id:
                    id,

            },

            data: {

                eliminado:
                    true,

                estado:
                    EstadoUsuario.INACTIVO,

            },

        });


    // =====================================================
    // RETORNAR SIN PASSWORD
    // =====================================================

    const {
        password: _password,
        ...usuarioSinPassword
    } = usuarioEliminado;


    return usuarioSinPassword;

};