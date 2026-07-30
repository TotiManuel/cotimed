export interface Usuario {


    id: number;

    nombre: string;

    apellido: string;

    email: string;

    password?: string;


    telefono: string;


    rol:
    | "ADMIN"
    | "INSTITUCION"
    | "PROVEEDOR"
    | "EMPLEADO"
    | string;



    estado: string;


    fotoPerfil?: string;


    ultimoAcceso: string;


    fechaCreacion: string;



    institucionId?: number;


    proveedorId?: number;



    institucion?: any;


    institucionAdmin?: any;


    proveedor?: any;



    createdAt?: Date;


    updatedAt?: Date;



    // Prisma

    ID?: string;

    Nombre?: string;

    Apellido?: string;

    Email?: string;

    Password?: string;

    Rol?: string;

    InstitucionID?: string;

    UltimoAcceso?: string;

    FechaCreacion?: string;

}