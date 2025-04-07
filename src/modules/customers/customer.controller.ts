import type { FastifyReply, FastifyRequest } from "fastify";

import type { QueryString } from "../../common/schema.js";

import { queryStringSchema } from "../../common/schema.js";
import { logger } from "../../utils/logger.js";
import { getCustomers } from "./customer.service.js";

export async function getCustomersHandler(
  request: FastifyRequest<{
    Querystring: QueryString;
  }>,
  reply: FastifyReply,
) {
  try {
    const query = queryStringSchema.parse(request.query);

    const result = await getCustomers(request.db, query);

    return reply.status(200).send({
      ...query,
      ...result,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
