import api from "../api/api";


/*
 * =========================================================
 * TIPOS
 * =========================================================
 */

export interface EquipoCatalogo {

    id: string;

    proveedorId: string;

    nombre: string;
    marca: string;
    modelo: string;
    categoria: string;

    estado: string;

    descripcion: string;

    precioUnitario: number;

    plazoEntregaDias: number;

    garantiaMeses: number;

    incluye: string[];

    especificaciones: string;

    createdAt?: string;
}


export interface CrearEquipamentoData {

    proveedorId: string;

    nombre: string;

    marca: string;

    modelo: string;

    categoria: string;

    estado?: string;

    descripcion: string;

    precioUnitario: number;

    plazoEntregaDias: number;

    garantiaMeses: number;

    incluye: string[];

    especificaciones: string;
}


/*
 * =========================================================
 * RESPUESTA DE LA API
 * =========================================================
 */

interface EquipamentoAPI {

    id_equipamento: number;

    id_proveedor: number;

    nombre_equipamento: string;

    marca_equipamento: string;

    modelo_equipamento: string;

    categoria_equipamento: string;

    estado_equipamento: string;

    descripcion_equipamento: string;

    precio_unitario_equipamento: number;

    plazo_entrega_dias: number;

    garantia_meses: number;

    incluye: unknown;

    fecha_registro?: string;

    especificaciones_equipamiento: string;
}


/*
 * =========================================================
 * TRANSFORMAR EQUIPAMIENTO
 * =========================================================
 */

const transformarEquipamento = (
    equipo: EquipamentoAPI
): EquipoCatalogo => {

    /*
     * Prisma guarda "incluye" como Json.
     *
     * Por eso verificamos que realmente sea un array.
     */

    let incluye: string[] = [];

    if (Array.isArray(equipo.incluye)) {

        incluye = equipo.incluye.map(
            item => String(item)
        );

    }


    return {

        id:
            String(
                equipo.id_equipamento
            ),


        proveedorId:
            String(
                equipo.id_proveedor
            ),


        nombre:
            equipo.nombre_equipamento ?? "",


        marca:
            equipo.marca_equipamento ?? "",


        modelo:
            equipo.modelo_equipamento ?? "",


        categoria:
            equipo.categoria_equipamento ?? "",


        estado:
            equipo.estado_equipamento ?? "activo",


        descripcion:
            equipo.descripcion_equipamento ?? "",


        precioUnitario:
            Number(
                equipo.precio_unitario_equipamento
            ) || 0,


        plazoEntregaDias:
            Number(
                equipo.plazo_entrega_dias
            ) || 0,


        garantiaMeses:
            Number(
                equipo.garantia_meses
            ) || 0,


        incluye,


        especificaciones:
            equipo.especificaciones_equipamiento ?? "",


        /*
         * Prisma:
         *
         * fecha_registro
         *
         * Frontend:
         *
         * createdAt
         */

        createdAt:
            equipo.fecha_registro

    };

};


/*
 * =========================================================
 * CREAR EQUIPAMIENTO
 * =========================================================
 */

export const crearEquipamento = async (
    data: CrearEquipamentoData
): Promise<EquipoCatalogo> => {


    const response =
        await api.post(
            "/equipamentos",
            {

                /*
                 * Prisma
                 */

                id_proveedor:
                    Number(
                        data.proveedorId
                    ),


                nombre_equipamento:
                    data.nombre.trim(),


                marca_equipamento:
                    data.marca.trim(),


                modelo_equipamento:
                    data.modelo.trim(),


                categoria_equipamento:
                    data.categoria.trim(),


                /*
                 * IMPORTANTE:
                 *
                 * Este campo es obligatorio
                 * en tu modelo Prisma.
                 */

                estado_equipamento:
                    data.estado?.trim() ||
                    "activo",


                descripcion_equipamento:
                    data.descripcion.trim(),


                precio_unitario_equipamiento:
                    Number(
                        data.precioUnitario
                    ),


                plazo_entrega_dias:
                    Number(
                        data.plazoEntregaDias
                    ),


                garantia_meses:
                    Number(
                        data.garantiaMeses
                    ),


                incluye:
                    Array.isArray(data.incluye)
                        ? data.incluye
                        : [],


                especificaciones_equipamiento:
                    data.especificaciones.trim()

            }
        );


    return transformarEquipamento(
        response as EquipamentoAPI
    );

};


/*
 * =========================================================
 * LISTAR EQUIPAMIENTOS
 * =========================================================
 */

export const listarEquipamentos =
    async (): Promise<EquipoCatalogo[]> => {


        const response =
            await api.get(
                "/equipamentos"
            );


        const equipamentos =
            response as EquipamentoAPI[];


        return equipamentos.map(
            transformarEquipamento
        );

    };


/*
 * =========================================================
 * OBTENER EQUIPAMIENTO
 * =========================================================
 */

export const obtenerEquipamento =
    async (
        id: string
    ): Promise<EquipoCatalogo> => {


        const response =
            await api.get(
                `/equipamentos/${id}`
            );


        return transformarEquipamento(
            response as EquipamentoAPI
        );

    };


/*
 * =========================================================
 * ALIAS
 * =========================================================
 */

export const buscarEquipamento =
    obtenerEquipamento;


/*
 * =========================================================
 * LISTAR POR PROVEEDOR
 * =========================================================
 */

export const listarEquipamentosPorProveedor =
    async (
        proveedorId: string
    ): Promise<EquipoCatalogo[]> => {


        const response =
            await api.get(
                `/equipamentos/proveedor/${proveedorId}`
            );


        const equipamentos =
            response as EquipamentoAPI[];


        return equipamentos.map(
            transformarEquipamento
        );

    };


/*
 * =========================================================
 * ACTUALIZAR EQUIPAMIENTO
 * =========================================================
 */

export const actualizarEquipamiento =
    async (
        id: string,
        data: Partial<CrearEquipamentoData>
    ): Promise<EquipoCatalogo> => {


        const body: Record<string, unknown> = {};


        /*
         * PROVEEDOR
         */

        if (
            data.proveedorId !== undefined
        ) {

            body.id_proveedor =
                Number(
                    data.proveedorId
                );

        }


        /*
         * NOMBRE
         */

        if (
            data.nombre !== undefined
        ) {

            body.nombre_equipamiento =
                data.nombre.trim();

        }


        /*
         * MARCA
         */

        if (
            data.marca !== undefined
        ) {

            body.marca_equipamiento =
                data.marca.trim();

        }


        /*
         * MODELO
         */

        if (
            data.modelo !== undefined
        ) {

            body.modelo_equipamiento =
                data.modelo.trim();

        }


        /*
         * CATEGORÍA
         */

        if (
            data.categoria !== undefined
        ) {

            body.categoria_equipamiento =
                data.categoria.trim();

        }


        /*
         * ESTADO
         */

        if (
            data.estado !== undefined
        ) {

            body.estado_equipamiento =
                data.estado.trim();

        }


        /*
         * DESCRIPCIÓN
         */

        if (
            data.descripcion !== undefined
        ) {

            body.descripcion_equipamiento =
                data.descripcion.trim();

        }


        /*
         * PRECIO
         */

        if (
            data.precioUnitario !== undefined
        ) {

            body.precio_unitario_equipamiento =
                Number(
                    data.precioUnitario
                );

        }


        /*
         * PLAZO DE ENTREGA
         */

        if (
            data.plazoEntregaDias !== undefined
        ) {

            body.plazo_entrega_dias =
                Number(
                    data.plazoEntregaDias
                );

        }


        /*
         * GARANTÍA
         */

        if (
            data.garantiaMeses !== undefined
        ) {

            body.garantia_meses =
                Number(
                    data.garantiaMeses
                );

        }


        /*
         * INCLUYE
         */

        if (
            data.incluye !== undefined
        ) {

            body.incluye =
                Array.isArray(
                    data.incluye
                )
                    ? data.incluye
                    : [];

        }


        /*
         * ESPECIFICACIONES
         */

        if (
            data.especificaciones !== undefined
        ) {

            body.especificaciones_equipamiento =
                data.especificaciones.trim();

        }


        /*
         * PETICIÓN
         */

        const response =
            await api.put(
                `/equipamentos/${id}`,
                body
            );


        return transformarEquipamento(
            response as EquipamentoAPI
        );

    };


/*
 * =========================================================
 * ALIAS PARA COMPATIBILIDAD
 * =========================================================
 */

export const actualizarEquipamento =
    actualizarEquipamiento;


/*
 * =========================================================
 * ELIMINAR EQUIPAMIENTO
 * =========================================================
 */

export const eliminarEquipamiento =
    async (
        id: string
    ): Promise<void> => {


        await api.delete(
            `/equipamentos/${id}`
        );

    };


/*
 * =========================================================
 * ALIAS PARA COMPATIBILIDAD
 * =========================================================
 */

export const eliminarEquipamento =
    eliminarEquipamiento;