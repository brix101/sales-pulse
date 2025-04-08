import { config } from "dotenv";
import { z } from "zod";

config();

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),
  DATABASE_URL: z.string().url(),
  DATABASE_MIGRATE: z.boolean().default(false),
  JWT_PUBLIC_KEY: z
    .string()
    .transform((val) => Buffer.from(val, "base64").toString("utf-8")),
  JWT_PRIVATE_KEY: z
    .string()
    .transform((val) => Buffer.from(val, "base64").toString("utf-8")),
  JWT_EXPIRATION_TIME: z.number().default(3600),
});

export type Env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
export default env!;
