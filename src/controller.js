import {
  createEvent,
  getClient,
  listCalendars,
  setCalendar,
  saveConfig,
  setCredentials
} from "./google-api";

export const getHome = async (req, res) => {
  res.render("index");
};

export const getLogin = async (req, res) => {
  const client = getClient();
  res.redirect(
    client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"]
    })
  );
};

export const getAuthCallback = (req, res) => {
  const code = req.query.code;
  const client = getClient();
  client.getToken(code, (err, tokens) => {
    if (err) {
      console.error("Error getting oAuth tokens:");
      throw err;
    }
    setCredentials(tokens);
    setTimeout(() => res.redirect("/"), 1000);
  });
};

export const postHookHandler = async (req, res) => {
  console.log(
    `${req.body.user_name} created a meet in ${req.body.channel_name} (${req.body.channel_id})`
  );
  const auth = getClient();

  const { url, name } = await createEvent(auth, req.body.user_name);
  res.send({
    response_type: "in_channel", // public to the channel
    text: `Join <${url}|${name}>`
  });
};

export const getCalendarSetup = async (req, res) => {
  const client = getClient();
  const calendars = (await listCalendars(client)).map(cal => ({
    id: cal.id,
    name: cal.summary
  }));
  res.render("calendar", {
    calendars
  });
};

export const postCalendar = (req, res) => {
  setCalendar(req.body.calendar);
  res.redirect("/");
  saveConfig();
};
