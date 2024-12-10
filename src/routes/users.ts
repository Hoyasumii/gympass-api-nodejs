import { users } from "@/controllers/index";
import { FastifyInstance } from "fastify";

export async function usersRoute(app: FastifyInstance) {
  app.post("/register", users.register);
  app.post("/authenticate", users.authenticate);
}
