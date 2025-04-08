import type { FastifyReply, FastifyRequest } from "fastify";

import type { GetSalesQueryString } from "./sale.schema.js";

import { logger } from "../../utils/logger.js";
import { getSales } from "./sale.service.js";

export async function getSalesHandler(
  request: FastifyRequest<{
    Querystring: GetSalesQueryString;
  }>,
  reply: FastifyReply,
) {
  try {
    const result = await getSales(request.db, request.query);

    return reply.status(200).send({
      ...request.query,
      ...result,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
