import { FastifyReply, FastifyRequest } from "fastify";
import { makeUsersAuthenticateUC } from "@/use-cases/factories";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const authenticateUserUseCase = makeUsersAuthenticateUC();

  await authenticateUserUseCase.run({ email, password });

  return reply.status(200).send();
}
