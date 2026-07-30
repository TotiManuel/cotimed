export interface Usuario {

    // Compatible con frontend actual
    id?: string;

    nombre?: string;

    apellido?: string;

    email?: string;

    password?: string;

    rol?:
    | "ADMIN"
    | "INSTITUCION"
    | "PROVEEDOR"
    | "EMPLEADO"
    | string;


    telefono?: string;

    estado?: string;

    fotoPerfil?: string;

    ultimoAcceso?: string;

    fechaCreacion?: string;


    institucionId?: string;

    proveedor?: any;

    institucion?: any;

    institucionAdmin?: any;

    createdAt?: string;

    updatedAt?: string;



    // Compatible con Prisma

    ID?: string;

    Nombre?: string;

    Apellido?: string;

    Email?: string;

    Password?: string;

    Rol?:
    | "ADMIN"
    | "INSTITUCION"
    | "PROVEEDOR"
    | "EMPLEADO"
    | string;


    InstitucionID?: string;

    UltimoAcceso?: string;

    FechaCreacion?: string;

}