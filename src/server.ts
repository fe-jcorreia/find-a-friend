import { app } from "./app";

const start = async () => {
  try {
    await app.listen({ host: "0.0.0.0", port: 3000 });
    console.log("HTTP Server running!")
  } catch (err) {
    app.log.error(err);
  }
};

start();
