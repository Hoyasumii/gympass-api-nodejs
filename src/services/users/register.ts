import { Users } from "@/repositories";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";

interface Register {
  email: string;
  name: string;
  password: string;
}

export async function register({ email, name, password }: Register) {
  const hashedPassword = await bcrypt.hash(password, 6);

  try {
    await Users.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error: unknown) {
    const { code } = error as PrismaClientKnownRequestError;

    if (code === "P2002") {
      throw new Error("E-mail already exists.");
    }

    throw new Error("Unkown Error");
  }
}
