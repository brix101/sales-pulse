import type { FastifyReply, FastifyRequest } from "fastify";
import {
  NotFoundError,
  UniqueConstraintViolationException,
} from "@mikro-orm/core";

import type { LoginRequest, SignupRequest } from "./user.schema.js";

import { logger } from "../../utils/logger.js";
import { loginUser, signupUser } from "./user.service.js";

export async function loginUserHandler(
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply,
) {
  try {
    const user = await loginUser(request.db, request.body);

    return reply.status(200).send({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    if (
      error instanceof NotFoundError ||
      (error instanceof Error && error.message === "Invalid password")
    ) {
      return reply.status(401).send({
        message: "Invalid email or password",
        details: {
          issues: {
            path: ["email"],
            message: "Invalid email or password",
          },
          method: request.method,
          url: request.url,
        },
      });
    }

    logger.error(error);
    return reply.status(500).send({
      message: "Something went wrong",
      details: {
        issues: {
          path: ["email"],
          message: "Failed to login user",
        },
      },
    });
  }
}

export async function signupUserHandler(
  request: FastifyRequest<{ Body: SignupRequest }>,
  reply: FastifyReply,
) {
  try {
    const user = await signupUser(request.db, request.body);

    return reply.status(201).send({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintViolationException) {
      return reply.status(400).send({
        message: "User already exists",
        details: {
          issues: {
            path: ["email"],
            message: "Email already exists",
          },
          method: request.method,
          url: request.url,
        },
      });
    }

    logger.error(error);
    return reply.status(500).send({
      message: "Something went wrong",
      details: {
        issues: {
          path: ["email"],
          message: "Failed to signup user",
        },
      },
    });
  }
}
