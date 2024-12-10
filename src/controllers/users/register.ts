import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "@/useCases";
import { z } from "zod";
import { UsersRepository } from "@/repositories/prisma";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  const usersRepository = new UsersRepository();
  const registerUserUseCase = new users.Register(usersRepository);

  await registerUserUseCase.run({ email, name, password });

  return reply.status(201).send();
}
