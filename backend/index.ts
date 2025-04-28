import Fastify from "fastify";
import routes from "./routes/index.js";

export async function getServer() {
  const server = Fastify();

  server.register(routes);

  await server.ready();

  return server;
}

if (process.argv[1] === import.meta.filename) {
  const server = await getServer();
  await server.listen({ port: 3000 });
  console.log("Server is running on http://localhost:3000");
}
