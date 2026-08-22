import { Request, Response } from "express";

import {
    Prisma,
    EstadoEquipamiento,
    TipoEquipamiento,
    TipoPrecio,
    TipoMoneda,
} from "@prisma/client";

import {
    crearEquipamento,
    listarEquipamentos,
    obtenerEquipamento,
    listarEquipamentosPorProveedor,
    actualizarEquipamento,
    eliminarEquipamento,
    ActualizarEquipamentoData,
} from "../services/equipamento.service";


// =========================================================
// HELPERS
// =========================================================

const obtenerValor = (
    body: Record<string, unknown>,
    camelCase: string,
    snakeCase: string
): unknown => {

    return body[camelCase] ?? body[snakeCase];
};


// ---------------------------------------------------------
// STRING
// ---------------------------------------------------------

const convertirString = (
    valor: unknown
): string | undefined => {

    if (
        valor === undefined ||
        valor === null
    ) {
        return undefined;
    }

    const texto =
        String(valor).trim();

    return texto.length > 0
        ? texto
        : undefined;
};


// ---------------------------------------------------------
// NUMBER
// ---------------------------------------------------------

const convertirNumero = (
    valor: unknown
): number | undefined => {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {
        return undefined;
    }

    const numero =
        Number(valor);

    return Number.isFinite(numero)
        ? numero
        : undefined;
};


// ---------------------------------------------------------
// INTEGER
// ---------------------------------------------------------

const convertirEntero = (
    valor: unknown
): number | undefined => {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {
        return undefined;
    }

    const numero =
        Number(valor);

    return Number.isInteger(numero)
        ? numero
        : undefined;
};


// ---------------------------------------------------------
// BOOLEAN
// ---------------------------------------------------------

const convertirBoolean = (
    valor: unknown
): boolean | undefined => {

    if (
        valor === undefined ||
        valor === null
    ) {
        return undefined;
    }

    if (
        typeof valor === "boolean"
    ) {
        return valor;
    }

    if (
        valor === "true" ||
        valor === "1"
    ) {
        return true;
    }

    if (
        valor === "false" ||
        valor === "0"
    ) {
        return false;
    }

    return undefined;
};


// ---------------------------------------------------------
// JSON
// ---------------------------------------------------------

const convertirJson = (
    valor: unknown
): Prisma.InputJsonValue | undefined => {

    if (
        valor === undefined ||
        valor === null
    ) {
        return undefined;
    }

    if (
        typeof valor === "string"
    ) {

        try {

            return JSON.parse(valor);

        } catch {

            return undefined;
        }
    }

    return valor as Prisma.InputJsonValue;
};


// ---------------------------------------------------------
// ENUM
// ---------------------------------------------------------

const esValorEnum = <T extends string>(
    valor: unknown,
    enumObject: Record<string, T>
): valor is T => {

    return (
        typeof valor === "string" &&
        Object.values(enumObject).includes(
            valor as T
        )
    );
};


// =========================================================
// POST /api/equipamentos
// CREAR EQUIPAMIENTO
// =========================================================

export const crear = async (
    req: Request,
    res: Response
) => {

    try {

        const body =
            req.body as Record<string, unknown>;


        // =====================================================
        // PROVEEDOR
        // =====================================================

        const proveedorRaw =
            obtenerValor(
                body,
                "proveedorId",
                "id_proveedor"
            );

        const proveedorId =
            convertirEntero(
                proveedorRaw
            );


        if (
            proveedorId === undefined ||
            proveedorId <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de proveedor inválido",
            });
        }


        // =====================================================
        // NOMBRE
        // =====================================================

        const nombre =
            convertirString(
                obtenerValor(
                    body,
                    "nombre",
                    "nombre_equipamento"
                )
            );


        if (!nombre) {

            return res.status(400).json({
                message:
                    "El nombre del equipamiento es obligatorio",
            });
        }


        // =====================================================
        // CATEGORÍA
        // =====================================================

        const categoria =
            convertirString(
                obtenerValor(
                    body,
                    "categoria",
                    "categoria_equipamento"
                )
            );


        if (!categoria) {

            return res.status(400).json({
                message:
                    "La categoría del equipamiento es obligatoria",
            });
        }


        // =====================================================
        // DESCRIPCIÓN
        // =====================================================

        const descripcion =
            convertirString(
                obtenerValor(
                    body,
                    "descripcion",
                    "descripcion_equipamento"
                )
            );


        if (!descripcion) {

            return res.status(400).json({
                message:
                    "La descripción del equipamiento es obligatoria",
            });
        }


        // =====================================================
        // PRECIO
        // =====================================================

        const precio =
            convertirNumero(
                obtenerValor(
                    body,
                    "precioUnitario",
                    "precio_unitario_equipamento"
                )
            );


        if (
            precio === undefined ||
            precio < 0
        ) {

            return res.status(400).json({
                message:
                    "El precio unitario no es válido",
            });
        }


        // =====================================================
        // TIPO
        // =====================================================

        const tipoRaw =
            obtenerValor(
                body,
                "tipo",
                "tipo_equipamiento"
            );


        let tipo:
            TipoEquipamiento | undefined;


        if (
            tipoRaw !== undefined
        ) {

            const valor =
                convertirString(
                    tipoRaw
                );


            if (
                !esValorEnum(
                    valor,
                    TipoEquipamiento
                )
            ) {

                return res.status(400).json({
                    message:
                        "El tipo de equipamiento no es válido",
                });
            }


            tipo = valor;
        }


        // =====================================================
        // ESTADO
        // =====================================================

        const estadoRaw =
            obtenerValor(
                body,
                "estado",
                "estado_equipamiento"
            );


        let estado:
            EstadoEquipamiento | undefined;


        if (
            estadoRaw !== undefined
        ) {

            const valor =
                convertirString(
                    estadoRaw
                );


            if (
                !esValorEnum(
                    valor,
                    EstadoEquipamiento
                )
            ) {

                return res.status(400).json({
                    message:
                        "El estado del equipamiento no es válido",
                });
            }


            estado = valor;
        }


        // =====================================================
        // TIPO DE PRECIO
        // =====================================================

        const tipoPrecioRaw =
            obtenerValor(
                body,
                "tipoPrecio",
                "tipo_precio"
            );


        let tipoPrecio:
            TipoPrecio | undefined;


        if (
            tipoPrecioRaw !== undefined
        ) {

            const valor =
                convertirString(
                    tipoPrecioRaw
                );


            if (
                !esValorEnum(
                    valor,
                    TipoPrecio
                )
            ) {

                return res.status(400).json({
                    message:
                        "El tipo de precio no es válido",
                });
            }


            tipoPrecio = valor;
        }


        // =====================================================
        // MONEDA
        // =====================================================

        const monedaRaw =
            obtenerValor(
                body,
                "moneda",
                "moneda"
            );


        let moneda:
            TipoMoneda | undefined;


        if (
            monedaRaw !== undefined
        ) {

            const valor =
                convertirString(
                    monedaRaw
                );


            if (
                !esValorEnum(
                    valor,
                    TipoMoneda
                )
            ) {

                return res.status(400).json({
                    message:
                        "La moneda no es válida",
                });
            }


            moneda = valor;
        }


        // =====================================================
        // STOCK
        // =====================================================

        const stock =
            convertirEntero(
                obtenerValor(
                    body,
                    "stock",
                    "stock"
                )
            );


        if (
            stock !== undefined &&
            stock < 0
        ) {

            return res.status(400).json({
                message:
                    "El stock no puede ser negativo",
            });
        }


        // =====================================================
        // STOCK MÍNIMO
        // =====================================================

        const stockMinimo =
            convertirEntero(
                obtenerValor(
                    body,
                    "stockMinimo",
                    "stock_minimo"
                )
            );


        if (
            stockMinimo !== undefined &&
            stockMinimo < 0
        ) {

            return res.status(400).json({
                message:
                    "El stock mínimo no puede ser negativo",
            });
        }


        // =====================================================
        // PLAZO DE ENTREGA
        // =====================================================

        const plazoEntrega =
            convertirEntero(
                obtenerValor(
                    body,
                    "plazoEntregaDias",
                    "plazo_entrega_dias"
                )
            );


        if (
            plazoEntrega !== undefined &&
            plazoEntrega < 0
        ) {

            return res.status(400).json({
                message:
                    "El plazo de entrega no puede ser negativo",
            });
        }


        // =====================================================
        // GARANTÍA
        // =====================================================

        const garantia =
            convertirEntero(
                obtenerValor(
                    body,
                    "garantiaMeses",
                    "garantia_meses"
                )
            );


        if (
            garantia !== undefined &&
            garantia < 0
        ) {

            return res.status(400).json({
                message:
                    "La garantía no puede ser negativa",
            });
        }


        // =====================================================
        // DISPONIBLE
        // =====================================================

        const disponibleRaw =
            obtenerValor(
                body,
                "disponible",
                "disponible"
            );


        let disponible:
            boolean | undefined;


        if (
            disponibleRaw !== undefined
        ) {

            disponible =
                convertirBoolean(
                    disponibleRaw
                );


            if (
                disponible === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo disponible no es válido",
                });
            }
        }


        // =====================================================
        // REQUIERE INSTALACIÓN
        // =====================================================

        const instalacionRaw =
            obtenerValor(
                body,
                "requiereInstalacion",
                "requiere_instalacion"
            );


        let requiereInstalacion:
            boolean | undefined;


        if (
            instalacionRaw !== undefined
        ) {

            requiereInstalacion =
                convertirBoolean(
                    instalacionRaw
                );


            if (
                requiereInstalacion === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo requiere_instalacion no es válido",
                });
            }
        }


        // =====================================================
        // REQUIERE CAPACITACIÓN
        // =====================================================

        const capacitacionRaw =
            obtenerValor(
                body,
                "requiereCapacitacion",
                "requiere_capacitacion"
            );


        let requiereCapacitacion:
            boolean | undefined;


        if (
            capacitacionRaw !== undefined
        ) {

            requiereCapacitacion =
                convertirBoolean(
                    capacitacionRaw
                );


            if (
                requiereCapacitacion === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo requiere_capacitacion no es válido",
                });
            }
        }


        // =====================================================
        // VIDA ÚTIL
        // =====================================================

        const vidaUtil =
            convertirEntero(
                obtenerValor(
                    body,
                    "vidaUtilAnios",
                    "vida_util_anios"
                )
            );


        if (
            vidaUtil !== undefined &&
            vidaUtil < 0
        ) {

            return res.status(400).json({
                message:
                    "La vida útil no puede ser negativa",
            });
        }


        // =====================================================
        // CAMPOS DE TEXTO OPCIONALES
        // =====================================================

        const marca =
            convertirString(
                obtenerValor(
                    body,
                    "marca",
                    "marca_equipamento"
                )
            );


        const modelo =
            convertirString(
                obtenerValor(
                    body,
                    "modelo",
                    "modelo_equipamento"
                )
            );


        const fabricante =
            convertirString(
                obtenerValor(
                    body,
                    "fabricante",
                    "fabricante"
                )
            );


        const origen =
            convertirString(
                obtenerValor(
                    body,
                    "origen",
                    "origen"
                )
            );


        const registroSanitario =
            convertirString(
                obtenerValor(
                    body,
                    "registroSanitario",
                    "registro_sanitario"
                )
            );


        const imagenPrincipal =
            convertirString(
                obtenerValor(
                    body,
                    "imagenPrincipal",
                    "imagen_principal"
                )
            );


        const especificaciones =
            convertirString(
                obtenerValor(
                    body,
                    "especificaciones",
                    "especificaciones_equipamento"
                )
            );


        // =====================================================
        // JSON
        // =====================================================

        const incluye =
            convertirJson(
                body.incluye
            );


        const accesorios =
            convertirJson(
                body.accesorios
            );


        const caracteristicas =
            convertirJson(
                body.caracteristicas
            );


        // =====================================================
        // CREAR
        // =====================================================

        const equipamento =
            await crearEquipamento({

                id_proveedor:
                    proveedorId,

                nombre_equipamento:
                    nombre,

                marca_equipamento:
                    marca,

                modelo_equipamento:
                    modelo,

                categoria_equipamento:
                    categoria,

                tipo_equipamento:
                    tipo,

                estado_equipamento:
                    estado,

                descripcion_equipamento:
                    descripcion,

                precio_unitario_equipamento:
                    precio,

                tipo_precio:
                    tipoPrecio,

                moneda,

                stock,

                stock_minimo:
                    stockMinimo,

                plazo_entrega_dias:
                    plazoEntrega,

                garantia_meses:
                    garantia,

                disponible,

                fabricante,

                origen,

                registro_sanitario:
                    registroSanitario,

                vida_util_anios:
                    vidaUtil,

                requiere_instalacion:
                    requiereInstalacion,

                requiere_capacitacion:
                    requiereCapacitacion,

                incluye,

                accesorios,

                caracteristicas,

                imagen_principal:
                    imagenPrincipal,

                especificaciones_equipamento:
                    especificaciones,
            });


        return res.status(201).json(
            equipamento
        );


    } catch (error: unknown) {

        console.error(
            "Error creando equipamiento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error creando equipamiento";


        if (
            message ===
            "El proveedor no existe"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(400).json({
            message,
        });
    }
};


// =========================================================
// GET /api/equipamentos
// LISTAR TODOS
// =========================================================

export const listar = async (
    req: Request,
    res: Response
) => {

    try {

        const equipamentos =
            await listarEquipamentos();


        return res.status(200).json(
            equipamentos
        );


    } catch (error: unknown) {

        console.error(
            "Error obteniendo equipamientos:",
            error
        );


        return res.status(500).json({
            message:
                "Error obteniendo equipamientos",
        });
    }
};


// =========================================================
// GET /api/equipamentos/:id
// OBTENER UNO
// =========================================================

export const obtener = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(
                req.params.id
            );


        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de equipamiento inválido",
            });
        }


        const equipamento =
            await obtenerEquipamento(id);


        return res.status(200).json(
            equipamento
        );


    } catch (error: unknown) {

        console.error(
            "Error obteniendo equipamiento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error obteniendo equipamiento";


        if (
            message ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};


// =========================================================
// GET /api/equipamentos/proveedor/:id_proveedor
// LISTAR POR PROVEEDOR
// =========================================================

export const listarPorProveedor = async (
    req: Request,
    res: Response
) => {

    try {

        const idProveedor =
            Number(
                req.params.id_proveedor
            );


        if (
            !Number.isInteger(idProveedor) ||
            idProveedor <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de proveedor inválido",
            });
        }


        const equipamentos =
            await listarEquipamentosPorProveedor(
                idProveedor
            );


        return res.status(200).json(
            equipamentos
        );


    } catch (error: unknown) {

        console.error(
            "Error obteniendo equipamientos del proveedor:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error obteniendo equipamientos del proveedor";


        if (
            message ===
            "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};


// =========================================================
// PUT /api/equipamentos/:id
// ACTUALIZAR
// =========================================================

export const actualizar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(
                req.params.id
            );


        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de equipamiento inválido",
            });
        }


        if (
            !req.body ||
            Object.keys(req.body).length === 0
        ) {

            return res.status(400).json({
                message:
                    "No se enviaron datos para actualizar",
            });
        }


        const body =
            req.body as Record<string, unknown>;


        const datos:
            ActualizarEquipamentoData = {};


        // =====================================================
        // PROVEEDOR
        // =====================================================

        const proveedorRaw =
            obtenerValor(
                body,
                "proveedorId",
                "id_proveedor"
            );


        if (
            proveedorRaw !== undefined
        ) {

            const proveedorId =
                convertirEntero(
                    proveedorRaw
                );


            if (
                proveedorId === undefined ||
                proveedorId <= 0
            ) {

                return res.status(400).json({
                    message:
                        "ID de proveedor inválido",
                });
            }


            datos.id_proveedor =
                proveedorId;
        }


        // =====================================================
        // TEXTOS
        // =====================================================

        const nombreRaw =
            obtenerValor(
                body,
                "nombre",
                "nombre_equipamento"
            );


        if (
            nombreRaw !== undefined
        ) {

            const valor =
                convertirString(
                    nombreRaw
                );


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El nombre no puede estar vacío",
                });
            }


            datos.nombre_equipamento =
                valor;
        }


        const marcaRaw =
            obtenerValor(
                body,
                "marca",
                "marca_equipamento"
            );


        if (
            marcaRaw !== undefined
        ) {

            datos.marca_equipamento =
                convertirString(
                    marcaRaw
                );
        }


        const modeloRaw =
            obtenerValor(
                body,
                "modelo",
                "modelo_equipamento"
            );


        if (
            modeloRaw !== undefined
        ) {

            datos.modelo_equipamento =
                convertirString(
                    modeloRaw
                );
        }


        const categoriaRaw =
            obtenerValor(
                body,
                "categoria",
                "categoria_equipamento"
            );


        if (
            categoriaRaw !== undefined
        ) {

            const valor =
                convertirString(
                    categoriaRaw
                );


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La categoría no puede estar vacía",
                });
            }


            datos.categoria_equipamento =
                valor;
        }


        const descripcionRaw =
            obtenerValor(
                body,
                "descripcion",
                "descripcion_equipamento"
            );


        if (
            descripcionRaw !== undefined
        ) {

            const valor =
                convertirString(
                    descripcionRaw
                );


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La descripción no puede estar vacía",
                });
            }


            datos.descripcion_equipamento =
                valor;
        }


        const especificacionesRaw =
            obtenerValor(
                body,
                "especificaciones",
                "especificaciones_equipamento"
            );


        if (
            especificacionesRaw !== undefined
        ) {

            datos.especificaciones_equipamento =
                convertirString(
                    especificacionesRaw
                );
        }


        const fabricanteRaw =
            body.fabricante;


        if (
            fabricanteRaw !== undefined
        ) {

            datos.fabricante =
                convertirString(
                    fabricanteRaw
                );
        }


        const origenRaw =
            body.origen;


        if (
            origenRaw !== undefined
        ) {

            datos.origen =
                convertirString(
                    origenRaw
                );
        }


        const registroRaw =
            obtenerValor(
                body,
                "registroSanitario",
                "registro_sanitario"
            );


        if (
            registroRaw !== undefined
        ) {

            datos.registro_sanitario =
                convertirString(
                    registroRaw
                );
        }


        const imagenRaw =
            obtenerValor(
                body,
                "imagenPrincipal",
                "imagen_principal"
            );


        if (
            imagenRaw !== undefined
        ) {

            datos.imagen_principal =
                convertirString(
                    imagenRaw
                );
        }


        // =====================================================
        // ENUMS
        // =====================================================

        const tipoRaw =
            obtenerValor(
                body,
                "tipo",
                "tipo_equipamiento"
            );


        if (
            tipoRaw !== undefined
        ) {

            const valor =
                convertirString(
                    tipoRaw
                );


            if (
                !esValorEnum(
                    valor,
                    TipoEquipamiento
                )
            ) {

                return res.status(400).json({
                    message:
                        "El tipo de equipamiento no es válido",
                });
            }


            datos.tipo_equipamiento =
                valor;
        }


        const estadoRaw =
            obtenerValor(
                body,
                "estado",
                "estado_equipamiento"
            );


        if (
            estadoRaw !== undefined
        ) {

            const valor =
                convertirString(
                    estadoRaw
                );


            if (
                !esValorEnum(
                    valor,
                    EstadoEquipamiento
                )
            ) {

                return res.status(400).json({
                    message:
                        "El estado del equipamiento no es válido",
                });
            }


            datos.estado_equipamento =
                valor;
        }


        const tipoPrecioRaw =
            obtenerValor(
                body,
                "tipoPrecio",
                "tipo_precio"
            );


        if (
            tipoPrecioRaw !== undefined
        ) {

            const valor =
                convertirString(
                    tipoPrecioRaw
                );


            if (
                !esValorEnum(
                    valor,
                    TipoPrecio
                )
            ) {

                return res.status(400).json({
                    message:
                        "El tipo de precio no es válido",
                });
            }


            datos.tipo_precio =
                valor;
        }


        const monedaRaw =
            body.moneda;


        if (
            monedaRaw !== undefined
        ) {

            const valor =
                convertirString(
                    monedaRaw
                );


            if (
                !esValorEnum(
                    valor,
                    TipoMoneda
                )
            ) {

                return res.status(400).json({
                    message:
                        "La moneda no es válida",
                });
            }


            datos.moneda =
                valor;
        }


        // =====================================================
        // PRECIO
        // =====================================================

        const precioRaw =
            obtenerValor(
                body,
                "precioUnitario",
                "precio_unitario_equipamento"
            );


        if (
            precioRaw !== undefined
        ) {

            const valor =
                convertirNumero(
                    precioRaw
                );


            if (
                valor === undefined ||
                valor < 0
            ) {

                return res.status(400).json({
                    message:
                        "El precio unitario no es válido",
                });
            }


            datos.precio_unitario_equipamento =
                valor;
        }


        // =====================================================
        // STOCK
        // =====================================================

        const stockRaw =
            body.stock;


        if (
            stockRaw !== undefined
        ) {

            const valor =
                convertirEntero(
                    stockRaw
                );


            if (
                valor === undefined ||
                valor < 0
            ) {

                return res.status(400).json({
                    message:
                        "El stock no es válido",
                });
            }


            datos.stock =
                valor;
        }


        // =====================================================
        // STOCK MÍNIMO
        // =====================================================

        const stockMinimoRaw =
            obtenerValor(
                body,
                "stockMinimo",
                "stock_minimo"
            );


        if (
            stockMinimoRaw !== undefined
        ) {

            const valor =
                convertirEntero(
                    stockMinimoRaw
                );


            if (
                valor === undefined ||
                valor < 0
            ) {

                return res.status(400).json({
                    message:
                        "El stock mínimo no es válido",
                });
            }


            datos.stock_minimo =
                valor;
        }


        // =====================================================
        // PLAZO
        // =====================================================

        const plazoRaw =
            obtenerValor(
                body,
                "plazoEntregaDias",
                "plazo_entrega_dias"
            );


        if (
            plazoRaw !== undefined
        ) {

            const valor =
                convertirEntero(
                    plazoRaw
                );


            if (
                valor === undefined ||
                valor < 0
            ) {

                return res.status(400).json({
                    message:
                        "El plazo de entrega no es válido",
                });
            }


            datos.plazo_entrega_dias =
                valor;
        }


        // =====================================================
        // GARANTÍA
        // =====================================================

        const garantiaRaw =
            obtenerValor(
                body,
                "garantiaMeses",
                "garantia_meses"
            );


        if (
            garantiaRaw !== undefined
        ) {

            const valor =
                convertirEntero(
                    garantiaRaw
                );


            if (
                valor === undefined ||
                valor < 0
            ) {

                return res.status(400).json({
                    message:
                        "La garantía no es válida",
                });
            }


            datos.garantia_meses =
                valor;
        }


        // =====================================================
        // VIDA ÚTIL
        // =====================================================

        const vidaUtilRaw =
            obtenerValor(
                body,
                "vidaUtilAnios",
                "vida_util_anios"
            );


        if (
            vidaUtilRaw !== undefined
        ) {

            const valor =
                convertirEntero(
                    vidaUtilRaw
                );


            if (
                valor === undefined ||
                valor < 0
            ) {

                return res.status(400).json({
                    message:
                        "La vida útil no es válida",
                });
            }


            datos.vida_util_anios =
                valor;
        }


        // =====================================================
        // BOOLEANOS
        // =====================================================

        const disponibleRaw =
            body.disponible;


        if (
            disponibleRaw !== undefined
        ) {

            const valor =
                convertirBoolean(
                    disponibleRaw
                );


            if (
                valor === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo disponible no es válido",
                });
            }


            datos.disponible =
                valor;
        }


        const instalacionRaw =
            obtenerValor(
                body,
                "requiereInstalacion",
                "requiere_instalacion"
            );


        if (
            instalacionRaw !== undefined
        ) {

            const valor =
                convertirBoolean(
                    instalacionRaw
                );


            if (
                valor === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo requiere_instalacion no es válido",
                });
            }


            datos.requiere_instalacion =
                valor;
        }


        const capacitacionRaw =
            obtenerValor(
                body,
                "requiereCapacitacion",
                "requiere_capacitacion"
            );


        if (
            capacitacionRaw !== undefined
        ) {

            const valor =
                convertirBoolean(
                    capacitacionRaw
                );


            if (
                valor === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo requiere_capacitacion no es válido",
                });
            }


            datos.requiere_capacitacion =
                valor;
        }


        // =====================================================
        // JSON
        // =====================================================

        const incluyeRaw =
            body.incluye;


        if (
            incluyeRaw !== undefined
        ) {

            const valor =
                convertirJson(
                    incluyeRaw
                );


            if (
                valor === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo incluye no contiene JSON válido",
                });
            }


            datos.incluye =
                valor;
        }


        const accesoriosRaw =
            body.accesorios;


        if (
            accesoriosRaw !== undefined
        ) {

            const valor =
                convertirJson(
                    accesoriosRaw
                );


            if (
                valor === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo accesorios no contiene JSON válido",
                });
            }


            datos.accesorios =
                valor;
        }


        const caracteristicasRaw =
            body.caracteristicas;


        if (
            caracteristicasRaw !== undefined
        ) {

            const valor =
                convertirJson(
                    caracteristicasRaw
                );


            if (
                valor === undefined
            ) {

                return res.status(400).json({
                    message:
                        "El campo caracteristicas no contiene JSON válido",
                });
            }


            datos.caracteristicas =
                valor;
        }


        // =====================================================
        // ACTUALIZAR
        // =====================================================

        const equipamento =
            await actualizarEquipamento(
                id,
                datos
            );


        return res.status(200).json(
            equipamento
        );


    } catch (error: unknown) {

        console.error(
            "Error actualizando equipamiento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error actualizando equipamiento";


        if (
            message ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        if (
            message ===
            "El proveedor indicado no existe"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(400).json({
            message,
        });
    }
};


// =========================================================
// DELETE /api/equipamentos/:id
// ELIMINAR
// =========================================================

export const eliminar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(
                req.params.id
            );


        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de equipamiento inválido",
            });
        }


        const equipamento =
            await eliminarEquipamento(
                id
            );


        return res.status(200).json({

            message:
                "Equipamiento eliminado correctamente",

            equipamento,
        });


    } catch (error: unknown) {

        console.error(
            "Error eliminando equipamiento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error eliminando equipamiento";


        if (
            message ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};