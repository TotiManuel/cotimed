// cotimed-api/src/services/proveedor.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    EstadoProveedor,
} from "@prisma/client";


// =========================================================
// SERVICE: PROVEEDOR
// =========================================================


// =========================================================
// LISTAR TODAS LAS PROVEEDORES
// =========================================================

export const listarProveedores = async () => {

    return await prisma.proveedor.findMany({

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
            equipamentos: true,
            cotizaciones: true,
            favoritos: true,
        },
    });
};


// =========================================================
// BUSCAR PROVEEDOR POR ID
// =========================================================

export const buscarProveedor = async (
    id: number
) => {

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: id,
            },

            include: {
            usuarios: true,
            direcciones: true,
            contactos: true,
            equipamentos: true,
            cotizaciones: true,
            favoritos: true,
        },
        });

    if (!proveedor) {

        throw new Error(
            "Proveedor no encontrado"
        );
    }

    return 
        proveedor;
};


// =========================================================
// CREAR PROVEEDOR
// =========================================================

export const crearProveedor = async (data: {

        razon_social: string;
        nombre_comercial?: string;
        cuit?: string;
        descripcion?: string;
        email?: string;
        telefono?: string;
        sitio_web?: string;
        logo_url?: string;
        estado?: EstadoProveedor;
        verificado?: boolean;
        fecha_verificacion?: Date;
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

        equipamentos?: {
            proveedor_id: number;
            categoria_id: number;
            nombre: string;
            marca?: string;
            modelo?: string;
            numero_parte?: string;
            codigo_interno?: string;
            tipo: TipoEquipamiento;
            descripcion: string;
            especificaciones?: string;
            estado?: EstadoEquipamiento;
            precio_unitario: number;
            tipo_precio?: TipoPrecio;
            moneda?: TipoMoneda;
            stock?: number;
            stock_minimo?: number;
            plazo_entrega_dias?: number;
            garantia_meses?: number;
            disponible?: boolean;
            fabricante?: string;
            origen?: string;
            registro_sanitario?: string;
            vida_util_anios?: number;
            requiere_instalacion?: boolean;
            requiere_capacitacion?: boolean;
            incluye?: any;
            accesorios?: any;
            caracteristicas?: any;
            imagen_principal?: string;
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

        favoritos?: {
            equipamento_id: number;
            usuario_id?: number;
            institucion_id?: number;
            proveedor_id?: number;
        }[];

}) => {

    return await prisma.proveedor.create({

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

            verificado:
                data.verificado,

            fecha_verificacion:
                data.fecha_verificacion,

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
            equipamentos: {
                create:
                    data.equipamentos.map((item) => ({
                        proveedor_id:
                            item.proveedor_id,
                        categoria_id:
                            item.categoria_id,
                        nombre:
                            item.nombre,
                        marca:
                            item.marca,
                        modelo:
                            item.modelo,
                        numero_parte:
                            item.numero_parte,
                        codigo_interno:
                            item.codigo_interno,
                        tipo:
                            item.tipo,
                        descripcion:
                            item.descripcion,
                        especificaciones:
                            item.especificaciones,
                        estado:
                            item.estado,
                        precio_unitario:
                            item.precio_unitario,
                        tipo_precio:
                            item.tipo_precio,
                        moneda:
                            item.moneda,
                        stock:
                            item.stock,
                        stock_minimo:
                            item.stock_minimo,
                        plazo_entrega_dias:
                            item.plazo_entrega_dias,
                        garantia_meses:
                            item.garantia_meses,
                        disponible:
                            item.disponible,
                        fabricante:
                            item.fabricante,
                        origen:
                            item.origen,
                        registro_sanitario:
                            item.registro_sanitario,
                        vida_util_anios:
                            item.vida_util_anios,
                        requiere_instalacion:
                            item.requiere_instalacion,
                        requiere_capacitacion:
                            item.requiere_capacitacion,
                        incluye:
                            item.incluye,
                        accesorios:
                            item.accesorios,
                        caracteristicas:
                            item.caracteristicas,
                        imagen_principal:
                            item.imagen_principal,
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
            equipamentos: true,
            cotizaciones: true,
            favoritos: true,
        },
    });
};


// =========================================================
// ACTUALIZAR PROVEEDOR
// =========================================================

export const actualizarProveedor = async (

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
        estado?: EstadoProveedor;
        verificado?: boolean;
        fecha_verificacion?: Date | null;
        eliminado?: boolean;

    },

) => {

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: id,
            },
        });

    if (!proveedor) {

        throw new Error(
            "Proveedor no encontrado"
        );
    }

    return await prisma.proveedor.update({

        where: {
            id: id,
        },

        data,

        include: {
            usuarios: true,
            direcciones: true,
            contactos: true,
            equipamentos: true,
            cotizaciones: true,
            favoritos: true,
        },
    });
};


// =========================================================
// ELIMINAR PROVEEDOR
// =========================================================

export const eliminarProveedor = async (
    id: number
) => {

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: id,
            },
        });

    if (!proveedor) {

        throw new Error(
            "Proveedor no encontrado"
        );
    }

    return await prisma.proveedor.update({

        where: {
            id: id,
        },

        data: {
            eliminado: true,
        },
    });
};