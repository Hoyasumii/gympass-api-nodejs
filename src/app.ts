import fastify from "fastify";
import dotenv from "dotenv";
import { getLogger } from "@/utils";
import routes from "./routes";
import { ZodError } from "zod";

if (!process.env.NODE_ENV) {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.test" });
}

const app = fastify({
  logger: getLogger(process.env.NODE_ENV),
});

app.register(routes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return reply
    .status(error.statusCode || 500)
    .send({ code: error.code, message: error.message });
});

export default app;
