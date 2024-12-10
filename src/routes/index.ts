import { FastifyInstance } from "fastify";
import { usersRoute } from "./users";

export default async function routes(app: FastifyInstance) {
  app.register(usersRoute, {
    prefix: "/users",
  });
}
