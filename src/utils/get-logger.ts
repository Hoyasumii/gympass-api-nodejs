import { PinoLoggerOptions } from "fastify/types/logger";

type LoggerType = {
  [key in typeof process.env.NODE_ENV]: boolean | PinoLoggerOptions;
};

export function getLogger(
  env: typeof process.env.NODE_ENV
): boolean | PinoLoggerOptions {
  const logger: LoggerType = {
    test: false,
    production: true,
    development: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  };

  return logger[env];
}
