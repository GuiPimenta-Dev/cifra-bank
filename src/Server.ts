require("dotenv/config");
import app from "./infra/http/Router";

app.listen(3000);

process.on("uncaughtException", (error, origin) => {
  console.log(`\n${origin} signal received: \n${error}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`\nunhandledRejection signal received: \n${error}`);
});
