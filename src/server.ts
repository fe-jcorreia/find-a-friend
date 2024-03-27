import { app } from "./app";
import { env } from "./env";

const start = async () => {
  try {
    await app.listen({ host: env.HOST, port: env.PORT });
    console.log("HTTP Server running!");
  } catch (err) {
    app.log.error(err);
  }
};

start();
