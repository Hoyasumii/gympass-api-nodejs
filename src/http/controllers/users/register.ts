import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "@/services";
import { z } from "zod";

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

  try {
    await users.register({ email, name, password });
  } catch (_) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
