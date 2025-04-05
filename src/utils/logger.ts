import pino from "pino";

import env from "@/env";

export const loggerOptions: pino.LoggerOptions = {
  level: env.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  redact: ["DATABASE_URL"],
};

export const logger = pino(loggerOptions);
