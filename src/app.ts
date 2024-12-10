import fastify from "fastify";
import dotenv from "dotenv";
import { getLogger } from "@/utils";
import routes from "./http/routes";
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

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: We should log to a external tool like DataLog
  }

  return reply.status(500).send({ message: "Internal server error." });
});

export default app;
