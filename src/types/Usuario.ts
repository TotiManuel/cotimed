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



    ultimoAcceso: string | Date;



    fechaCreacion: string | Date;



    institucionId?: number;



    proveedorId?: number;



    institucion?: any;


    institucionAdmin?: any;


    proveedor?: any;



    createdAt?: string | Date;



    updatedAt?: string | Date;





    // Compatibilidad Prisma

    ID?: string;


    Nombre?: string;


    Apellido?: string;


    Email?: string;


    Password?: string;


    Rol?: string;



    InstitucionID?: string;



    UltimoAcceso?: string | Date;



    FechaCreacion?: string | Date;


}