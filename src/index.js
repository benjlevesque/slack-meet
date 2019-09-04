import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { login } from "./google-api";
import { createEvent } from "./meet";

dotenv.config();
const requiredConfig = ["CLIENT_ID", "CLIENT_SECRET", "TOKEN", "CALENDAR_ID"];
for (const config of requiredConfig) {
  if (!process.env[config]) {
    console.error(`missing required config ${config}`);
    process.exit(1);
  }
}

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send("OK");
});

app.post("/", async (req, res) => {
  console.log(
    `${req.body.user_name} created a meet in ${req.body.channel_name} (${req.body.channel_id})`
  );
  const auth = login();
  const { url, name } = await createEvent(auth, req.body.user_name);
  res.send({
    response_type: "in_channel", // public to the channel
    text: `Join <${url}|${name}>`
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
