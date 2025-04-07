import type { FastifyReply, FastifyRequest } from "fastify";

import type { QueryString } from "../../common/schema.js";

import { queryStringSchema } from "../../common/schema.js";
import { logger } from "../../utils/logger.js";
import { getProducts } from "./product.service.js";

export async function getProductsHandler(
  request: FastifyRequest<{
    Querystring: QueryString;
  }>,
  reply: FastifyReply,
) {
  try {
    const query = queryStringSchema.parse(request.query);

    const result = await getProducts(request.db, query);

    return reply.status(200).send({
      ...query,
      ...result,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
