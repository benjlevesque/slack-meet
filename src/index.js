import path from "path";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { setupMiddleware } from "./middlewares";
import {
  postHookHandler,
  getAuthCallback,
  getCalendarSetup,
  postCalendar,
  getHome,
  getLogin
} from "./controller";
import { loadConfig } from "./google-api";

dotenv.config();
const requiredConfig = ["CLIENT_ID", "CLIENT_SECRET"];
for (const config of requiredConfig) {
  if (!process.env[config]) {
    console.error(`missing required config ${config}`);
    process.exit(1);
  }
}
loadConfig();

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/login", getLogin);
app.get("/oauth2callback", getAuthCallback);

app.post("/", setupMiddleware, postHookHandler);
app.get("/", setupMiddleware, getHome);
app.get("/calendar", setupMiddleware, getCalendarSetup);
app.post("/calendar", setupMiddleware, postCalendar);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
