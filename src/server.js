import express, { json, urlencoded } from "express";
import { createMeet } from "./meet.js";

/** @return {Express} */
export const initServer = () => {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.get("/", (request, response) => {
    response.send("OK");
  });

  app.post("/", async (req, res) => {
    const { user_name, channel_name, channel_id } = req.body;
    console.log(
      `${user_name} created a meet in ${channel_name} (${channel_id})`,
    );
    const url = await createMeet();
    res.send({
      response_type: "in_channel", // public to the channel
      text: `Join <${url}|call with ${user_name}>`,
    });
  });

  return app;
};
