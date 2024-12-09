import { users } from "@/http/controllers/index";
import { FastifyInstance } from "fastify";

export async function usersRoute(app: FastifyInstance) {
  app.post("/register", users.register);
}
