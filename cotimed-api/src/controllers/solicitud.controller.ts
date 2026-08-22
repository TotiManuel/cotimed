// cotimed-api/src/controllers/solicitudes.controller.ts

import { Request, Response } from "express";

import {
    listarSolicitudes,
    buscarSolicitud,
    listarSolicitudesPorInstitucion,
    crearSolicitud,
    actualizarSolicitud,
    eliminarSolicitud,
} from "../services/solicitud.service";

import {
    EstadoSolicitud,
    NivelUrgencia,
    TipoMoneda,
} from "@prisma/client";


// =========================================================
// GET /api/solicitudes
// Listar todas las solicitudes
// =========================================================

export const listar = async (
    req: Request,
    res: Response
) => {

    try {

        const solicitudes =
            await listarSolicitudes();

        return res.status(200).json(
            solicitudes
        );

    } catch (error) {

        console.error(
            "Error listando solicitudes:",
            error
        );

        return res.status(500).json({
            mensaje:
                "Error obteniendo las solicitudes",
        });
    }
};


// =========================================================
// GET /api/solicitudes/:id
// Obtener solicitud por ID
// =========================================================

export const obtener = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);

        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de solicitud inválido",
            });
        }

        const solicitud =
            await buscarSolicitud(id);

        return res.status(200).json(
            solicitud
        );

    } catch (error: unknown) {

        console.error(
            "Error obteniendo solicitud:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error obteniendo la solicitud";

        if (
            mensaje ===
            "Solicitud no encontrada"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }

        return res.status(500).json({
            mensaje:
                "Error obteniendo la solicitud",
        });
    }
};


// =========================================================
// GET /api/solicitudes/institucion/:id
// Listar solicitudes por institución
// =========================================================

export const listarPorInstitucion = async (
    req: Request,
    res: Response
) => {

    try {

        const id_institucion =
            Number(req.params.id);

        if (
            !Number.isInteger(id_institucion) ||
            id_institucion <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de institución inválido",
            });
        }

        const solicitudes =
            await listarSolicitudesPorInstitucion(
                id_institucion
            );

        return res.status(200).json(
            solicitudes
        );

    } catch (error) {

        console.error(
            "Error obteniendo solicitudes de institución:",
            error
        );

        return res.status(500).json({
            mensaje:
                "Error obteniendo las solicitudes",
        });
    }
};


// =========================================================
// POST /api/solicitudes
// Crear solicitud
// =========================================================

export const crear = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            numero,
            titulo,
            descripcion,
            institucion_id,
            creado_por_id,
            urgencia,
            estado,
            fecha_limite_cotizacion,
            presupuesto_estimado,
            moneda,
            condiciones,
            observaciones,
            lugar_entrega,
            requiere_instalacion,
            requiere_capacitacion,
            items,
        } = req.body;


        // =====================================================
        // VALIDACIONES
        // =====================================================

        if (!numero?.trim()) {

            return res.status(400).json({
                mensaje:
                    "El número de solicitud es obligatorio",
            });
        }


        if (!titulo?.trim()) {

            return res.status(400).json({
                mensaje:
                    "El título es obligatorio",
            });
        }


        if (!descripcion?.trim()) {

            return res.status(400).json({
                mensaje:
                    "La descripción es obligatoria",
            });
        }


        const institucionId =
            Number(institucion_id);

        if (
            !Number.isInteger(institucionId) ||
            institucionId <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de institución inválido",
            });
        }


        const creadorId =
            Number(creado_por_id);

        if (
            !Number.isInteger(creadorId) ||
            creadorId <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de usuario creador inválido",
            });
        }


        if (
            !Array.isArray(items) ||
            items.length === 0
        ) {

            return res.status(400).json({
                mensaje:
                    "Debe existir al menos un item",
            });
        }


        // =====================================================
        // VALIDAR ITEMS
        // =====================================================

        const itemsValidados =
            items.map((item: any, index: number) => {

                if (!item.nombre?.trim()) {

                    throw new Error(
                        `El nombre del item ${index + 1} es obligatorio`
                    );
                }


                const cantidad =
                    Number(item.cantidad);

                if (
                    !Number.isFinite(cantidad) ||
                    cantidad <= 0
                ) {

                    throw new Error(
                        `La cantidad del item ${index + 1} no es válida`
                    );
                }


                return {

                    equipamento_id:
                        item.equipamento_id !== undefined &&
                        item.equipamento_id !== null
                            ? Number(item.equipamento_id)
                            : undefined,

                    nombre:
                        String(
                            item.nombre
                        ).trim(),

                    descripcion:
                        item.descripcion !== undefined
                            ? String(
                                item.descripcion
                            ).trim()
                            : undefined,

                    cantidad,

                    especificaciones:
                        item.especificaciones !== undefined
                            ? String(
                                item.especificaciones
                            ).trim()
                            : undefined,

                    marca_preferida:
                        item.marca_preferida !== undefined
                            ? String(
                                item.marca_preferida
                            ).trim()
                            : undefined,

                    modelo_preferido:
                        item.modelo_preferido !== undefined
                            ? String(
                                item.modelo_preferido
                            ).trim()
                            : undefined,

                    unidad_medida:
                        item.unidad_medida !== undefined
                            ? String(
                                item.unidad_medida
                            ).trim()
                            : undefined,

                    presupuesto_unitario:
                        item.presupuesto_unitario !== undefined &&
                        item.presupuesto_unitario !== null
                            ? Number(
                                item.presupuesto_unitario
                            )
                            : undefined,

                    presupuesto_total:
                        item.presupuesto_total !== undefined &&
                        item.presupuesto_total !== null
                            ? Number(
                                item.presupuesto_total
                            )
                            : undefined,
                };
            });


        // =====================================================
        // CREAR
        // =====================================================

        const solicitud =
            await crearSolicitud({

                numero:
                    String(numero).trim(),

                titulo:
                    String(titulo).trim(),

                descripcion:
                    String(descripcion).trim(),

                institucion_id:
                    institucionId,

                creado_por_id:
                    creadorId,

                urgencia:
                    urgencia
                        ? urgencia as NivelUrgencia
                        : undefined,

                estado:
                    estado
                        ? estado as EstadoSolicitud
                        : undefined,

                fecha_limite_cotizacion:
                    fecha_limite_cotizacion
                        ? new Date(
                            fecha_limite_cotizacion
                        )
                        : undefined,

                presupuesto_estimado:
                    presupuesto_estimado !== undefined &&
                    presupuesto_estimado !== null
                        ? Number(
                            presupuesto_estimado
                        )
                        : undefined,

                moneda:
                    moneda
                        ? moneda as TipoMoneda
                        : undefined,

                condiciones:
                    condiciones !== undefined
                        ? String(condiciones).trim()
                        : undefined,

                observaciones:
                    observaciones !== undefined
                        ? String(observaciones).trim()
                        : undefined,

                lugar_entrega:
                    lugar_entrega !== undefined
                        ? String(lugar_entrega).trim()
                        : undefined,

                requiere_instalacion:
                    requiere_instalacion !== undefined
                        ? Boolean(requiere_instalacion)
                        : undefined,

                requiere_capacitacion:
                    requiere_capacitacion !== undefined
                        ? Boolean(requiere_capacitacion)
                        : undefined,

                items:
                    itemsValidados,
            });


        return res.status(201).json({
            mensaje:
                "Solicitud creada correctamente",

            solicitud,
        });

    } catch (error: unknown) {

        console.error(
            "Error creando solicitud:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error creando la solicitud";


        if (
            mensaje ===
            "La institución no existe"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        if (
            mensaje ===
            "El usuario creador no existe"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        return res.status(400).json({
            mensaje,
        });
    }
};


// =========================================================
// PUT /api/solicitudes/:id
// Actualizar solicitud
// =========================================================

export const actualizar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de solicitud inválido",
            });
        }


        if (
            !req.body ||
            Object.keys(req.body).length === 0
        ) {

            return res.status(400).json({
                mensaje:
                    "No se enviaron datos para actualizar",
            });
        }


        const {
            titulo,
            descripcion,
            estado,
            urgencia,
            fecha_publicacion,
            fecha_limite_cotizacion,
            fecha_cierre,
            presupuesto_estimado,
            moneda,
            condiciones,
            observaciones,
            lugar_entrega,
            requiere_instalacion,
            requiere_capacitacion,
        } = req.body;


        const data: {
            titulo?: string;
            descripcion?: string;
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
        } = {};


        if (titulo !== undefined) {

            if (!String(titulo).trim()) {

                return res.status(400).json({
                    mensaje:
                        "El título no puede estar vacío",
                });
            }

            data.titulo =
                String(titulo).trim();
        }


        if (descripcion !== undefined) {

            if (!String(descripcion).trim()) {

                return res.status(400).json({
                    mensaje:
                        "La descripción no puede estar vacía",
                });
            }

            data.descripcion =
                String(descripcion).trim();
        }


        if (estado !== undefined) {

            data.estado =
                estado as EstadoSolicitud;
        }


        if (urgencia !== undefined) {

            data.urgencia =
                urgencia as NivelUrgencia;
        }


        if (fecha_publicacion !== undefined) {

            data.fecha_publicacion =
                new Date(fecha_publicacion);
        }


        if (
            fecha_limite_cotizacion !== undefined
        ) {

            data.fecha_limite_cotizacion =
                new Date(
                    fecha_limite_cotizacion
                );
        }


        if (fecha_cierre !== undefined) {

            data.fecha_cierre =
                new Date(fecha_cierre);
        }


        if (
            presupuesto_estimado !== undefined
        ) {

            const presupuesto =
                Number(
                    presupuesto_estimado
                );

            if (!Number.isFinite(presupuesto)) {

                return res.status(400).json({
                    mensaje:
                        "El presupuesto estimado no es válido",
                });
            }

            data.presupuesto_estimado =
                presupuesto;
        }


        if (moneda !== undefined) {

            data.moneda =
                moneda as TipoMoneda;
        }


        if (condiciones !== undefined) {

            data.condiciones =
                String(condiciones).trim();
        }


        if (observaciones !== undefined) {

            data.observaciones =
                String(observaciones).trim();
        }


        if (lugar_entrega !== undefined) {

            data.lugar_entrega =
                String(lugar_entrega).trim();
        }


        if (
            requiere_instalacion !== undefined
        ) {

            data.requiere_instalacion =
                Boolean(
                    requiere_instalacion
                );
        }


        if (
            requiere_capacitacion !== undefined
        ) {

            data.requiere_capacitacion =
                Boolean(
                    requiere_capacitacion
                );
        }


        const solicitud =
            await actualizarSolicitud(
                id,
                data
            );


        return res.status(200).json({
            mensaje:
                "Solicitud actualizada correctamente",

            solicitud,
        });

    } catch (error: unknown) {

        console.error(
            "Error actualizando solicitud:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error actualizando la solicitud";


        if (
            mensaje ===
            "Solicitud no encontrada"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        return res.status(400).json({
            mensaje,
        });
    }
};


// =========================================================
// DELETE /api/solicitudes/:id
// Eliminación lógica
// =========================================================

export const eliminar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de solicitud inválido",
            });
        }


        const solicitud =
            await eliminarSolicitud(id);


        return res.status(200).json({
            mensaje:
                "Solicitud eliminada correctamente",

            solicitud,
        });

    } catch (error: unknown) {

        console.error(
            "Error eliminando solicitud:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error eliminando la solicitud";


        if (
            mensaje ===
            "Solicitud no encontrada"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        return res.status(500).json({
            mensaje:
                "Error eliminando la solicitud",
        });
    }
};