import fastify from "fastify";
import dotenv from "dotenv";
import { getLogger } from "@/utils";
import routes from "./http/routes";

if (!process.env.NODE_ENV) {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.test" });
}

const app = fastify({
  logger: getLogger(process.env.NODE_ENV),
});

app.register(routes);

export default app;
