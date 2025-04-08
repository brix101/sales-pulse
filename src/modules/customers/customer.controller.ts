import type { FastifyReply, FastifyRequest } from "fastify";

import type { QueryStringType } from "../../common/schema.js";

import { getCustomers } from "./customer.service.js";

export async function getCustomersHandler(
  request: FastifyRequest<{ Querystring: QueryStringType }>,
  reply: FastifyReply,
) {
  try {
    const result = await getCustomers(request.db, request.query);

    return reply.status(200).send({
      ...request.query,
      ...result,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ message: "Something went wrong" });
  }
}
