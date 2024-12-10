import createError from "@fastify/error";

export const InvalidCredentialsError = createError(
  "Invalid Credentials Error",
  "The dat provided is not valid.",
  401
);
