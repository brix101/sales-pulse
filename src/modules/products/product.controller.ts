import type {FastifyReply, FastifyRequest} from "fastify";

import { logger } from "@/utils/logger";

import type { GetProductsQueryString} from "./product.schema";
import { queryStringSchema } from "./product.schema";
import { getProducts } from "./product.service";

export async function getProductsHandler(
  request: FastifyRequest<{
    Querystring: GetProductsQueryString;
  }>,
  reply: FastifyReply,
) {
  try {
    const query = queryStringSchema.parse(request.query);

    const result = await getProducts(query, request.db);

    return reply.status(200).send({
      ...result,
      ...query,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
