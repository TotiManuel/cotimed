import { Request, Response } from "express";
import prisma from "../prisma/prisma";


export const getUsers = async (req: Request, res: Response) => {

    try {

        const users = await prisma.user.findMany();

        res.json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al obtener usuarios"
        });

    }

};



export const createUser = async (req: Request, res: Response) => {

    try {

        const {
            name_user,
            email,
            password,
            rol,
            organizacion
        } = req.body;


        const user = await prisma.user.create({

            data: {
                name_user,
                email,
                password,
                rol,
                organizacion
            }

        });


        res.status(201).json(user);


    } catch (error) {

        console.error(error);


        res.status(500).json({
            message: "Error al crear usuario"
        });

    }

};