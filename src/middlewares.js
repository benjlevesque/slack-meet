import { getClient, getCalendar } from "./google-api";

export const setupMiddleware = (req, res, next) => {
  const client = getClient();
  if (!client.credentials.access_token) {
    if (req.method === "GET") {
      return res.redirect("/login");
    } else {
      return res.status(500).send("server not setup");
    }
  }
  if (!getCalendar() && req.url != "/calendar") {
    if (req.method === "GET") {
      return res.redirect("/calendar");
    } else {
      return res.status(500).send("server not setup");
    }
  }
  return next();
};
