import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "@/useCases";
import { z } from "zod";
import { UsersRepository } from "@/repositories/prisma";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const usersRepository = new UsersRepository();
  const authenticateUserUseCase = new users.Authenticate(usersRepository);

  await authenticateUserUseCase.run({ email, password });

  return reply.status(200).send();
}
