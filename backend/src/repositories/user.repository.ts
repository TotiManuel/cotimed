import { prisma } from "../config/database";

export class UserRepository {

    async findByEmail(email: string) {

        return prisma.user.findUnique({

            where: {
                email
            }

        });

    }

    async findById(id: number) {

        return prisma.user.findUnique({

            where: {
                id
            }

        });

    }

}