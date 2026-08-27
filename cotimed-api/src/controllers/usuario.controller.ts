import { Request, Response } from "express";
import { listarUsuarios, listarUsuariosActivos, buscarUsuarioByID, crearUsuario, actualizarUsuario, eliminarUsuario } from "../services/usuario.service";

export const listaUsuarios = async( req: Request, res:Response )=>{
    try {
        const usuarios = await listarUsuarios();
        res.status(201).json(usuarios);
    } catch (error) {
        error:error
    }
};
export const listaUsuariosActivos = async( req: Request, res:Response )=>{
    try {
        const usuarios = await listarUsuariosActivos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(404).json({
            error: error
        });
    }
};
export const busquedaUsuarioByID = async( req: Request, res:Response )=>{
    try{
        const id = Number(req.params.id);
        const usuario = await buscarUsuarioByID(id);
        res.status(200).json(usuario);
    } catch(error){
        res.status(404).json({
            error: error        
        });
    }

}
export const crearUsuarios = async( req: Request, res:Response )=>{
    try {
        const usuarioCreado = await crearUsuario(req.body);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        res.status(400).json({
            error:error
        });
    }
};
export const actualizaUsuario = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "ID de usuario inválido"
            });
        }

        const usuarioActualizado = await actualizarUsuario(
            id,
            req.body
        );

        return res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error: any) {

        if (error.message === "Usuario no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar usuario"
        });
    }
};
export const eliminaUsuario = async( req: Request, res:Response )=>{
    try {
        const id = Number(req.params.id);
        const usuarioEliminado = await eliminarUsuario(id)
        res.status(201).json(usuarioEliminado);
    } catch (error) {
        res.status(400).json({
            error:error
        });
    }
}