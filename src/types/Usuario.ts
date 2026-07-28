export type RolUsuario =
    | "ADMIN"
    | "INSTITUCION"
    | "PROVEEDOR"
    | "EMPLEADO";


export type EstadoUsuario =
    | "ACTIVO"
    | "PENDIENTE"
    | "SUSPENDIDO";



export interface Usuario {


    id:number;


    nombre:string;


    apellido:string;


    email:string;


    telefono?:string | null;



    rol:RolUsuario;


    estado:EstadoUsuario;



    fotoPerfil?:string | null;



    ultimoAcceso?:Date;



    fechaCreacion:Date;


    createdAt:string;


    updatedAt:string;



    institucionId?:number | null;



    institucion?:{

        id:number;

        nombre:string;

    } | null;




    institucionAdmin?:{

        id:number;

        nombre:string;

    } | null;




    proveedor?:{

        id:number;

        nombre:string;

    } | null;


}