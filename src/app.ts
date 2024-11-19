import fastify from "fastify";
import dotenv from "dotenv";

if (!process.env.NODE_ENV) {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.test" });
}

const app = fastify({
  logger: process.env.NODE_ENV === "development",
});

export default app;
