// cotimed-api/src/services/institucion.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    EstadoInstitucion,
} from "@prisma/client";


// =========================================================
// SERVICE: INSTITUCION
// =========================================================


// =========================================================
// LISTAR TODAS LAS INSTITUCIONES
// =========================================================

export const listarInstituciones = async () => {

    return await prisma.institucion.findMany({

        where: {
            eliminado: false,
        },

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
            usuarios: true,
            direcciones: true,
            contactos: true,
            solicitudes: true,
            favoritos: true,
        },
    });
};


// =========================================================
// BUSCAR INSTITUCION POR ID
// =========================================================

export const buscarInstitucion = async (
    id: number
) => {

    const institucion =
        await prisma.institucion.findUnique({

            where: {
                id: id,
            },

            include: {
            usuarios: true,
            direcciones: true,
            contactos: true,
            solicitudes: true,
            favoritos: true,
        },
        });

    if (!institucion) {

        throw new Error(
            "Institucion no encontrado"
        );
    }

    return 
        institucion;
};


// =========================================================
// CREAR INSTITUCION
// =========================================================

export const crearInstitucion = async (data: {

        razon_social: string;
        nombre_comercial?: string;
        cuit?: string;
        descripcion?: string;
        email?: string;
        telefono?: string;
        sitio_web?: string;
        logo_url?: string;
        estado?: EstadoInstitucion;
        eliminado?: boolean;

        usuarios?: {
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
        }[];

        direcciones?: {
            tipo: TipoDireccion;
            calle: string;
            numero?: string;
            piso?: string;
            departamento?: string;
            codigo_postal?: string;
            ciudad: string;
            provincia: string;
            pais: string;
            latitud?: number;
            longitud?: number;
            institucion_id?: number;
            proveedor_id?: number;
        }[];

        contactos?: {
            nombre: string;
            apellido?: string;
            cargo?: string;
            email?: string;
            telefono?: string;
            tipo: TipoContacto;
            principal?: boolean;
            institucion_id?: number;
            proveedor_id?: number;
        }[];

        solicitudes?: {
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

        favoritos?: {
            equipamento_id: number;
            usuario_id?: number;
            institucion_id?: number;
            proveedor_id?: number;
        }[];

}) => {

    return await prisma.institucion.create({

        data: {

            razon_social:
                data.razon_social,

            nombre_comercial:
                data.nombre_comercial,

            cuit:
                data.cuit,

            descripcion:
                data.descripcion,

            email:
                data.email,

            telefono:
                data.telefono,

            sitio_web:
                data.sitio_web,

            logo_url:
                data.logo_url,

            estado:
                data.estado,

            eliminado:
                data.eliminado,

            usuarios: {
                create:
                    data.usuarios.map((item) => ({
                        nombre:
                            item.nombre,
                        apellido:
                            item.apellido,
                        email:
                            item.email,
                        password:
                            item.password,
                        telefono:
                            item.telefono,
                        tipo_documento:
                            item.tipo_documento,
                        numero_documento:
                            item.numero_documento,
                        rol:
                            item.rol,
                        estado:
                            item.estado,
                        avatar_url:
                            item.avatar_url,
                        ultimo_login:
                            item.ultimo_login,
                        email_verificado:
                            item.email_verificado,
                        institucion_id:
                            item.institucion_id,
                        proveedor_id:
                            item.proveedor_id,
                        eliminado:
                            item.eliminado,
                    })),
            },
            direcciones: {
                create:
                    data.direcciones.map((item) => ({
                        tipo:
                            item.tipo,
                        calle:
                            item.calle,
                        numero:
                            item.numero,
                        piso:
                            item.piso,
                        departamento:
                            item.departamento,
                        codigo_postal:
                            item.codigo_postal,
                        ciudad:
                            item.ciudad,
                        provincia:
                            item.provincia,
                        pais:
                            item.pais,
                        latitud:
                            item.latitud,
                        longitud:
                            item.longitud,
                        institucion_id:
                            item.institucion_id,
                        proveedor_id:
                            item.proveedor_id,
                    })),
            },
            contactos: {
                create:
                    data.contactos.map((item) => ({
                        nombre:
                            item.nombre,
                        apellido:
                            item.apellido,
                        cargo:
                            item.cargo,
                        email:
                            item.email,
                        telefono:
                            item.telefono,
                        tipo:
                            item.tipo,
                        principal:
                            item.principal,
                        institucion_id:
                            item.institucion_id,
                        proveedor_id:
                            item.proveedor_id,
                    })),
            },
            solicitudes: {
                create:
                    data.solicitudes.map((item) => ({
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
        },

        include: {
            usuarios: true,
            direcciones: true,
            contactos: true,
            solicitudes: true,
            favoritos: true,
        },
    });
};


// =========================================================
// ACTUALIZAR INSTITUCION
// =========================================================

export const actualizarInstitucion = async (

    id: number,

    data: {

        razon_social?: string;
        nombre_comercial?: string | null;
        cuit?: string | null;
        descripcion?: string | null;
        email?: string | null;
        telefono?: string | null;
        sitio_web?: string | null;
        logo_url?: string | null;
        estado?: EstadoInstitucion;
        eliminado?: boolean;

    },

) => {

    const institucion =
        await prisma.institucion.findUnique({

            where: {
                id: id,
            },
        });

    if (!institucion) {

        throw new Error(
            "Institucion no encontrado"
        );
    }

    return await prisma.institucion.update({

        where: {
            id: id,
        },

        data,

        include: {
            usuarios: true,
            direcciones: true,
            contactos: true,
            solicitudes: true,
            favoritos: true,
        },
    });
};


// =========================================================
// ELIMINAR INSTITUCION
// =========================================================

export const eliminarInstitucion = async (
    id: number
) => {

    const institucion =
        await prisma.institucion.findUnique({

            where: {
                id: id,
            },
        });

    if (!institucion) {

        throw new Error(
            "Institucion no encontrado"
        );
    }

    return await prisma.institucion.update({

        where: {
            id: id,
        },

        data: {
            eliminado: true,
        },
    });
};