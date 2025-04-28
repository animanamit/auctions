import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { huh: "what" };
  });
  fastify.get(
    "/health",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { status: "okay" };
    }
  );
}

export default routes;
