import type { Services } from "../../db.js";
import type { LoginRequest, SignupRequest } from "./user.schema.js";

import { logger } from "../../utils/logger.js";

export async function signupUser(db: Services, request: SignupRequest) {
  try {
    const user = db.user.create(request);
    await db.em.flush();
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function loginUser(db: Services, request: LoginRequest) {
  try {
    const user = await db.user.findOneOrFail(
      { email: request.email },
      {
        populate: ["password"],
      },
    );

    const isPasswordValid = await user.verifyPassword(request.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
