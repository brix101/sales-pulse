import pino from "pino";

export const logger = pino({
  level: "info", // TODO: make this configurable
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  redact: ["DATABASE_URL"], // TODO: make this configurable
});
