import { prisma } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcryptjs";

interface Register {
  email: string;
  name: string;
  password: string;
}

export async function register({ email, name, password }: Register) {
  const hashedPassword = await hash(password, 6);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error: unknown) {
    const { code } = error as PrismaClientKnownRequestError;

    if (code === "P2002") {
      throw new Error("E-mail already exists.");
    }

    throw new Error("Unkown Error");
  }
}
