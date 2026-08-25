// cotimed-api/src/services/institucion.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import bcrypt from "bcrypt";

import {
    EstadoInstitucion,
    EstadoSolicitud,
    EstadoUsuario,
    NivelUrgencia,
    RolUsuario,
    TipoContacto,
    TipoDireccion,
    TipoDocumento,
    TipoMoneda,
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

            usuarios: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                    telefono: true,

                    tipo_documento: true,

                    numero_documento: true,

                    rol: true,

                    estado: true,

                    avatar_url: true,

                    ultimo_login: true,

                    email_verificado: true,

                    institucion_id: true,

                    proveedor_id: true,

                    fecha_creacion: true,

                    fecha_actualizacion: true,

                    eliminado: true,

                },

            },

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

                usuarios: {

                    select: {

                        id: true,

                        nombre: true,

                        apellido: true,

                        email: true,

                        telefono: true,

                        tipo_documento: true,

                        numero_documento: true,

                        rol: true,

                        estado: true,

                        avatar_url: true,

                        ultimo_login: true,

                        email_verificado: true,

                        institucion_id: true,

                        proveedor_id: true,

                        fecha_creacion: true,

                        fecha_actualizacion: true,

                        eliminado: true,

                    },

                },

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


    return institucion;

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


    // =====================================================
    // NORMALIZAR EMAIL DE LOS USUARIOS
    // =====================================================

    const usuarios =
        data.usuarios ?? [];


    // =====================================================
    // VERIFICAR EMAILS
    // =====================================================

    for (const item of usuarios) {

        const email =
            item.email.trim().toLowerCase();


        const emailExistente =
            await prisma.usuario.findUnique({

                where: {

                    email,

                },

            });


        if (emailExistente) {

            throw new Error(
                `Ya existe un usuario registrado con el email ${email}`
            );

        }

    }


    // =====================================================
    // VERIFICAR CUIT
    // =====================================================

    if (data.cuit) {

        const cuitExistente =
            await prisma.institucion.findUnique({

                where: {

                    cuit:
                        data.cuit,

                },

            });


        if (cuitExistente) {

            throw new Error(
                "Ya existe una institución registrada con ese CUIT"
            );

        }

    }


    // =====================================================
    // HASH DE PASSWORDS
    // =====================================================

    const usuariosHasheados =
        await Promise.all(

            usuarios.map(
                async (item) => {

                    if (
                        !item.password ||
                        item.password.trim().length < 6
                    ) {

                        throw new Error(
                            "La contraseña debe tener al menos 6 caracteres"
                        );

                    }


                    const passwordHash =
                        await bcrypt.hash(
                            item.password,
                            12
                        );


                    return {

                        ...item,

                        email:
                            item.email
                                .trim()
                                .toLowerCase(),

                        password:
                            passwordHash,

                    };

                }
            )

        );


    // =====================================================
    // CREAR INSTITUCION
    // =====================================================

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
                data.email
                    ?.trim()
                    .toLowerCase(),

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


            // =================================================
            // USUARIOS
            // =================================================

            usuarios: {

                create:

                    usuariosHasheados.map(
                        (item) => ({

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

                            eliminado:
                                item.eliminado,

                        })
                    ),

            },


            // =================================================
            // DIRECCIONES
            // =================================================

            direcciones: {

                create:

                    (data.direcciones ?? []).map(
                        (item) => ({

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

                        })
                    ),

            },


            // =================================================
            // CONTACTOS
            // =================================================

            contactos: {

                create:

                    (data.contactos ?? []).map(
                        (item) => ({

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

                        })
                    ),

            },


            // =================================================
            // SOLICITUDES
            // =================================================

            solicitudes: {

                create:

                    (data.solicitudes ?? []).map(
                        (item) => ({

                            numero:
                                item.numero,

                            titulo:
                                item.titulo,

                            descripcion:
                                item.descripcion,

                            creado_por: {

                                connect: {

                                    id:
                                        item.creado_por_id,

                                },

                            },

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

                        })
                    ),

            },


            // =================================================
            // FAVORITOS
            // =================================================

            favoritos: {

                create:

                    (data.favoritos ?? []).map(
                        (item) => ({

                            equipamento: {

                                connect: {

                                    id:
                                        item.equipamento_id,

                                },

                            },

                            ...(item.usuario_id !== undefined
                                ? {

                                    usuario: {

                                        connect: {

                                            id:
                                                item.usuario_id,

                                        },

                                    },

                                }
                                : {}),

                            ...(item.institucion_id !== undefined
                                ? {

                                    institucion: {

                                        connect: {

                                            id:
                                                item.institucion_id,

                                        },

                                    },

                                }
                                : {}),

                            ...(item.proveedor_id !== undefined
                                ? {

                                    proveedor: {

                                        connect: {

                                            id:
                                                item.proveedor_id,

                                        },

                                    },

                                }
                                : {}),

                        })
                    ),

            },

        },


        // =====================================================
        // INCLUDE
        // =====================================================

        include: {

            usuarios: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                    telefono: true,

                    tipo_documento: true,

                    numero_documento: true,

                    rol: true,

                    estado: true,

                    avatar_url: true,

                    ultimo_login: true,

                    email_verificado: true,

                    institucion_id: true,

                    proveedor_id: true,

                    fecha_creacion: true,

                    fecha_actualizacion: true,

                    eliminado: true,

                },

            },

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


    // =====================================================
    // VERIFICAR INSTITUCIÓN
    // =====================================================

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


    // =====================================================
    // VERIFICAR CUIT
    // =====================================================

    if (
        data.cuit !== undefined &&
        data.cuit !== null &&
        data.cuit !== institucion.cuit
    ) {

        const cuitExistente =
            await prisma.institucion.findUnique({

                where: {

                    cuit:
                        data.cuit,

                },

            });


        if (
            cuitExistente &&
            cuitExistente.id !== id
        ) {

            throw new Error(
                "El CUIT ya está siendo utilizado"
            );

        }

    }


    // =====================================================
    // NORMALIZAR EMAIL
    // =====================================================

    const email =
        data.email !== undefined &&
        data.email !== null
            ? data.email
                .trim()
                .toLowerCase()
            : data.email;


    // =====================================================
    // VERIFICAR EMAIL
    // =====================================================

    if (
        email &&
        email !== institucion.email
    ) {

        const emailUsuario =
            await prisma.usuario.findUnique({

                where: {

                    email,

                },

            });


        if (emailUsuario) {

            throw new Error(
                "El email ya está siendo utilizado"
            );

        }


        const emailInstitucion =
            await prisma.institucion.findFirst({

                where: {

                    email,

                    eliminado: false,

                    NOT: {

                        id: id,

                    },

                },

            });


        if (emailInstitucion) {

            throw new Error(
                "El email ya está siendo utilizado"
            );

        }

    }


    // =====================================================
    // DATOS DE ACTUALIZACIÓN
    // =====================================================

    const datosActualizacion = {

        ...(data.razon_social !== undefined
            ? {
                razon_social:
                    data.razon_social,
            }
            : {}),

        ...(data.nombre_comercial !== undefined
            ? {
                nombre_comercial:
                    data.nombre_comercial,
            }
            : {}),

        ...(data.cuit !== undefined
            ? {
                cuit:
                    data.cuit,
            }
            : {}),

        ...(data.descripcion !== undefined
            ? {
                descripcion:
                    data.descripcion,
            }
            : {}),

        ...(data.email !== undefined
            ? {
                email,
            }
            : {}),

        ...(data.telefono !== undefined
            ? {
                telefono:
                    data.telefono,
            }
            : {}),

        ...(data.sitio_web !== undefined
            ? {
                sitio_web:
                    data.sitio_web,
            }
            : {}),

        ...(data.logo_url !== undefined
            ? {
                logo_url:
                    data.logo_url,
            }
            : {}),

        ...(data.estado !== undefined
            ? {
                estado:
                    data.estado,
            }
            : {}),

        ...(data.eliminado !== undefined
            ? {
                eliminado:
                    data.eliminado,
            }
            : {}),

    };


    // =====================================================
    // ACTUALIZAR
    // =====================================================

    return await prisma.$transaction(

        async (tx) => {

            const institucionActualizada =
                await tx.institucion.update({

                    where: {

                        id: id,

                    },

                    data:
                        datosActualizacion,

                });


            // =================================================
            // ACTUALIZAR USUARIO PRINCIPAL
            // =================================================

            const usuarioPrincipal =
                await tx.usuario.findFirst({

                    where: {

                        institucion_id:
                            id,

                        eliminado: false,

                        rol:
                            RolUsuario.INSTITUCION,

                    },

                    orderBy: {

                        id: "asc",

                    },

                });


            if (usuarioPrincipal) {

                const datosUsuario: {

                    email?: string;

                    telefono?: string | null;

                } = {};


                if (
                    data.email !== undefined &&
                    email !== null
                ) {

                    datosUsuario.email =
                        email;

                }


                if (
                    data.telefono !== undefined
                ) {

                    datosUsuario.telefono =
                        data.telefono;

                }


                if (
                    Object.keys(datosUsuario).length > 0
                ) {

                    await tx.usuario.update({

                        where: {

                            id:
                                usuarioPrincipal.id,

                        },

                        data:
                            datosUsuario,

                    });

                }

            }


            return institucionActualizada;

        }

    );

};


// =========================================================
// ELIMINAR INSTITUCION
// =========================================================

export const eliminarInstitucion = async (
    id: number
) => {


    // =====================================================
    // VERIFICAR INSTITUCIÓN
    // =====================================================

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


    // =====================================================
    // ELIMINACIÓN LÓGICA
    // =====================================================

    return await prisma.$transaction(

        async (tx) => {

            const institucionEliminada =
                await tx.institucion.update({

                    where: {

                        id: id,

                    },

                    data: {

                        eliminado: true,

                        estado:
                            EstadoInstitucion.INACTIVA,

                    },

                });


            // =================================================
            // DESACTIVAR USUARIOS RELACIONADOS
            // =================================================

            await tx.usuario.updateMany({

                where: {

                    institucion_id:
                        id,

                    eliminado: false,

                },

                data: {

                    eliminado: true,

                    estado:
                        EstadoUsuario.INACTIVO,

                },

            });


            return institucionEliminada;

        }

    );

};