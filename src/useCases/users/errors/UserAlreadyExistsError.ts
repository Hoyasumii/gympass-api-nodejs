import createError from "@fastify/error";

export const UserAlreadyExistsError = createError(
  "User Already Exists Error",
  "E-mail already exists",
  409
);
