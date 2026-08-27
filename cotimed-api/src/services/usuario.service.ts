import { RolUsuario, TipoDocumento } from "@prisma/client";
import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";

export const listarUsuarios = async ()=> {
    return await prisma.usuario.findMany();
}
export const listarUsuariosActivos = async()=>{
    const listadoUsuario = await prisma.usuario.findMany({
        where:{
            eliminado: false
        }
    });
    return listadoUsuario
}
export const buscarUsuarioByID = async(id: number)=> {
    const usuario = await prisma.usuario.findUnique({
        where:{
            id:id
        }
    });
    return usuario
}
export const crearUsuario = async(data:{ nombre: string, apellido: string, email: string, password: string, telefono: string,tipo_documento: TipoDocumento,numero_documento: string,pais: string,provincia: string,ciudad: string,rol: RolUsuario} )=> {
    const existente = await prisma.usuario.findUnique({
        where: {
            email: data.email 
        }
    });
    if (existente) {
        throw new Error("Email ya registrado");
    }
    const hashedPassword =
            await bcrypt.hash(
                data.password,
                10
            );
    const usuario = await prisma.usuario.create({
        data: {
              nombre: data.nombre,
              apellido: data.apellido,
              email: data. email,
              password: hashedPassword,
              telefono: data.telefono,
              tipo_documento: data.tipo_documento,
              numero_documento: data.numero_documento,
              pais: data.pais,
              provincia: data.provincia,
              ciudad: data.ciudad,
              rol: data.rol
        }
    });
    return usuario
}
export const actualizarUsuario = async (
    id: number,
    data: {
        nombre?: string;
        apellido?: string;
        email?: string;
        password?: string;
        telefono?: string;
        tipo_documento?: TipoDocumento;
        numero_documento?: string;
        pais?: string;
        provincia?: string;
        ciudad?: string;
        rol?: RolUsuario;
    }
) => {

    const usuario = await prisma.usuario.findUnique({
        where: {
            id: id
        }
    });

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const usuarioActualizado = await prisma.usuario.update({
        where: {
            id: id
        },
        data: data
    });

    return usuarioActualizado;
};
export const eliminarUsuario = async(id: number)=> {
    prisma.usuario.update({
        where: { id },
        data: {
            eliminado: true
        }
    });
}
