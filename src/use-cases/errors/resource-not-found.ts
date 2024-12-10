import createError from "@fastify/error";

export const ResourceNotFoundError = createError(
  "ResourceNotFoundError",
  "The resource was not found.",
  404
);
