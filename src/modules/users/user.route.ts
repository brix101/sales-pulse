import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { verifyJWT } from "../../utils/auth.js";
import {
  getMeHandler,
  loginUserHandler,
  signupUserHandler,
} from "./user.controller.js";
import { loginSchema, signupSchema } from "./user.schema.js";

export function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/login", {
    schema: { body: loginSchema },
    handler: loginUserHandler,
  });

  app.withTypeProvider<ZodTypeProvider>().post("/signup", {
    schema: { body: signupSchema },
    handler: signupUserHandler,
  });

  app.get("/me", {
    preHandler: verifyJWT,
    handler: getMeHandler,
  });
}
