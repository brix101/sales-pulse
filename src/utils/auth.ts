import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Middleware to verify JWT token
 * Returns 401 Unauthorized if token is invalid or expired
 */
export const verifyJWT = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void,
) => {
  request.jwtVerify((err) => {
    if (err) {
      reply.status(401).send({
        message: "Unauthorized",
        details: {
          issues: {
            path: ["token"],
            message: "Invalid or expired token",
          },
          method: request.method,
          url: request.url,
        },
      });
      return;
    }
    done();
  });
};
