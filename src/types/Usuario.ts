export interface Usuario {

    ID:string;

    Nombre:string;

    Apellido?:string;

    Email:string;

    Rol:
    "ADMIN" |
    "INSTITUCION" |
    "PROVEEDOR" |
    "EMPLEADO";


    InstitucionID?:string;

    UltimoAcceso?:string;

    FechaCreacion?:string;

}