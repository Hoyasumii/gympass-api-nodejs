import createError from "@fastify/error";

export const InvalidCredentialsError = createError(
  "Invalid Credentials Error",
  "The data provided is not valid.",
  401
);
