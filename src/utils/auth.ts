import type { FastifyReply, FastifyRequest } from "fastify";

import type { MeRequest } from "../modules/users/user.schema.js";

/**
 * Middleware to verify JWT token
 * Returns 401 Unauthorized if token is invalid or expired
 */
export const verifyJWT = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void,
) => {
  const user = request.user as MeRequest;
  if (!user.id) {
    reply.status(401).send({
      message: "Unauthorized",
      details: {
        issues: {
          path: ["token"],
          message: "Invalid or expired token",
        },
      },
    });
    return;
  }
  done();
};
