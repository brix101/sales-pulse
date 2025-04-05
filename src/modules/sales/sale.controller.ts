import type {FastifyReply, FastifyRequest} from "fastify";

import { logger } from "@/utils/logger";

import type { GetSalesQueryString} from "./sale.schema";
import { queryStringSchema } from "./sale.schema";
import { getSales } from "./sale.service";

export async function getSalesHandler(
  request: FastifyRequest<{
    Querystring: GetSalesQueryString;
  }>,
  reply: FastifyReply,
) {
  try {
    const query = queryStringSchema.parse(request.query);

    const result = await getSales(query, request.db);

    return reply.status(200).send({
      ...result,
      ...query,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
