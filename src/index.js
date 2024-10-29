import { initConfig } from "./config.js";
import { initServer } from "./server.js";

const main = async () => {
  initConfig();
  const app = initServer();
  const listener = app.listen(process.env.PORT || 3000);
  console.log("Your app is listening on port " + listener.address().port);
};

void main();
