import { prisma } from "@/utils";
import { Prisma } from "@prisma/client";

export class Users {
  static async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }
}
