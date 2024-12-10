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

  const { data, error } = registerBodySchema.safeParse(request.body);

  if (error) {
    return reply.status(400).send({
      message: `🚫 Bad Request at ${request.url}(${request.method})`,
      cause: error.issues,
    });
  }

  const { email, name, password } = data;

  const usersRepository = new UsersRepository();
  const createUserUseCase = new users.RegisterUseCase(usersRepository);

  await createUserUseCase.run({ email, name, password });

  return reply.status(201).send();
}
