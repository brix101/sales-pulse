import type { FastifyReply, FastifyRequest } from "fastify";

import type { QueryStringType } from "../../common/schema.js";

import { logger } from "../../utils/logger.js";
import { getProducts } from "./product.service.js";

export async function getProductsHandler(
  request: FastifyRequest<{
    Querystring: QueryStringType;
  }>,
  reply: FastifyReply,
) {
  try {
    const result = await getProducts(request.db, request.query);

    return reply.status(200).send({
      ...request.query,
      ...result,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
