import type {FastifyReply, FastifyRequest} from "fastify";

import { logger } from "@/utils/logger";

import type { GetCustomersQueryString} from "./customer.schema";
import { queryStringSchema } from "./customer.schema";
import { getCustomers } from "./customer.service";

export async function getCustomersHandler(
  request: FastifyRequest<{
    Querystring: GetCustomersQueryString;
  }>,
  reply: FastifyReply,
) {
  try {
    const query = queryStringSchema.parse(request.query);

    const result = await getCustomers(query, request.db);

    return reply.status(200).send({
      ...result,
      ...query,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
