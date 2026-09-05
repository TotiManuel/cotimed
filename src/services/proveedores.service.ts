import api from "../api/api";


/**
 * PROVEEDOR
 *
 * Representa los datos que devuelve el backend.
 *
 * La contraseña NO se incluye porque nunca debería
 * enviarse al frontend.
 */
export interface Proveedor {

    id: number;

    name_user: string;

    razon_social: string;

    direccion: string;

    email: string;

    rol: "proveedor";

    organizacion: string;

    estado_user: string;

    ciudad_user: string;

    provincia_user: string;

    pais_user: string;
}


/**
 * DATOS PARA CREAR UN PROVEEDOR
 *
 * La contraseña se envía al backend en texto plano
 * mediante HTTPS.
 *
 * El backend es responsable de convertirla a bcrypt.
 */
export interface CrearProveedorData {

    name_user: string;

    razon_social: string;

    direccion: string;

    email: string;

    password: string;

    organizacion: string;

    estado_user: string;

    ciudad_user: string;

    provincia_user: string;

    pais_user: string;
}


/**
 * DATOS PARA ACTUALIZAR UN PROVEEDOR
 *
 * Todos los campos son opcionales porque se puede
 * modificar solamente una parte del proveedor.
 */
export interface ActualizarProveedorData {

    name_user?: string;

    razon_social?: string;

    direccion?: string;

    email?: string;

    password?: string;

    organizacion?: string;

    estado_user?: string;

    ciudad_user?: string;

    provincia_user?: string;

    pais_user?: string;
}


/**
 * LISTAR PROVEEDORES
 *
 * GET /proveedores
 */
export const listarProveedores = async (): Promise<Proveedor[]> => {

    return await api.get(
        "/proveedores"
    );
};


/**
 * BUSCAR PROVEEDOR POR ID
 *
 * GET /proveedores/:id
 */
export const buscarProveedor = async (
    id: number
): Promise<Proveedor> => {

    return await api.get(
        `/proveedores/${id}`
    );
};


/**
 * BUSCAR PROVEEDORES POR TEXTO
 *
 * GET /proveedores/buscar?q=texto
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
 * POST /proveedores
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
 * PUT /proveedores/:id
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
 * DELETE /proveedores/:id
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