import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { prisma } from "@/utils";
import { z, ZodError } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { email, name, password } = registerBodySchema.parse(request.body);

  } catch (e: unknown) {
    const error = e as ZodError<z.infer<typeof registerBodySchema>>;

    
  }

  

}
