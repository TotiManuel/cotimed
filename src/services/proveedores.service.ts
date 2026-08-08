import api from "../api/api";


export interface Proveedor {

    id: number;

    name_user: string;

    email: string;

    rol: "proveedor";

    organizacion: string;
}


export interface CrearProveedorData {

    name_user: string;

    email: string;

    password: string;

    organizacion: string;
}


export interface ActualizarProveedorData {

    name_user?: string;

    email?: string;

    password?: string;

    organizacion?: string;
}


/**
 * LISTAR PROVEEDORES
 *
 * GET /api/proveedores
 */
export const listarProveedores = async (): Promise<Proveedor[]> => {

    return await api.get(
        "/proveedores"
    );
};


/**
 * BUSCAR PROVEEDOR POR ID
 *
 * GET /api/proveedores/:id
 */
export const buscarProveedor = async (
    id: number
): Promise<Proveedor> => {

    return await api.get(
        `/proveedores/${id}`
    );
};


/**
 * BUSCAR PROVEEDORES
 *
 * GET /api/proveedores/buscar?q=texto
 */
export const buscarProveedores = async (
    texto: string
): Promise<Proveedor[]> => {

    return await api.get(
        `/proveedores/buscar?q=${encodeURIComponent(texto)}`
    );
};


/**
 * CREAR PROVEEDOR
 *
 * POST /api/proveedores
 */
export const crearProveedor = async (
    data: CrearProveedorData
): Promise<Proveedor> => {

    return await api.post(
        "/proveedores",
        data
    );
};


/**
 * ACTUALIZAR PROVEEDOR
 *
 * PUT /api/proveedores/:id
 */
export const actualizarProveedor = async (
    id: number,
    data: ActualizarProveedorData
): Promise<Proveedor> => {

    return await api.put(
        `/proveedores/${id}`,
        data
    );
};


/**
 * ELIMINAR PROVEEDOR
 *
 * DELETE /api/proveedores/:id
 */
export const eliminarProveedor = async (
    id: number
): Promise<{
    mensaje: string;
}> => {

    return await api.delete(
        `/proveedores/${id}`
    );
};