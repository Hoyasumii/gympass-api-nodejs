import { FastifyReply, FastifyRequest } from "fastify";
import { makeUsersRegisterUC } from "@/use-cases/factories";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  const registerUserUseCase = makeUsersRegisterUC();

  await registerUserUseCase.run({ email, name, password });

  return reply.status(201).send();
}
