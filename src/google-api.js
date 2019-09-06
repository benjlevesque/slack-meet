import { google } from "googleapis";
import fs from "fs";

let client = null;
let calendarId = null;
let credentials = null;

const initClient = () => {
  const { CLIENT_SECRET, CLIENT_ID } = process.env;
  client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    "http://localhost:3000/oauth2callback"
  );
};

export const getClient = () => {
  if (!client) {
    initClient();
  }
  if (credentials && !client.credentials.access_token) {
    client.setCredentials(credentials);
  }
  return client;
};

export const getCalendar = () => calendarId;

export const setCalendar = calendar => {
  calendarId = calendar;
};

export const setCredentials = cred => {
  credentials = cred;
};

const getConfigPath = () => {
  return process.env.CONFIG_PATH || "config.json";
};

export const loadConfig = () => {
  if (fs.existsSync(getConfigPath())) {
    const configStr = fs.readFileSync(getConfigPath()).toString();
    const config = JSON.parse(configStr);
    credentials = config.credentials;
    calendarId = config.calendarId;
  } else {
    if (process.env.TOKEN) {
      setCredentials(JSON.parse(process.env.TOKEN));
    }
    if (process.env.CALENDAR_ID) {
      setCalendar(process.env.CALENDAR_ID);
    }
    if (process.env.TOKEN || process.env.CALENDAR_ID) {
      saveConfig();
    }
  }
};
export const saveConfig = () => {
  var data = JSON.stringify({
    calendarId,
    credentials
  });

  fs.writeFile(getConfigPath(), data, err => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
};

const addMinutes = (date, minutes) =>
  new Date(date.getTime() + minutes * 60000);

export const createEvent = async (auth, user) => {
  const calendar = google.calendar({ version: "v3", auth });
  const name = `Call with ${user}`;
  var event = {
    summary: name,
    start: {
      dateTime: new Date().toISOString()
    },
    end: {
      dateTime: addMinutes(new Date(), "15").toISOString()
    }
  };

  const eventCreateResponse = await calendar.events.insert({
    auth: auth,
    calendarId,
    resource: event
  });

  const meet = await calendar.events.patch({
    calendarId,
    eventId: eventCreateResponse.data.id,
    resource: {
      conferenceData: {
        createRequest: { requestId: Number(new Date()) },
        name
      }
    },
    conferenceDataVersion: 1
  });
  const { conferenceId } = meet.data.conferenceData;
  return {
    url: `https://meet.google.com/${conferenceId}`,
    name
  };
};

export const listCalendars = async auth => {
  const calendar = google.calendar({ version: "v3", auth });
  const list = await calendar.calendarList.list();
  return list.data.items;
};
