import { google } from "googleapis";

const addMinutes = (date, minutes) =>
  new Date(date.getTime() + minutes * 60000);

export const createEvent = async (auth, user) => {
  const calendarId = process.env.CALENDAR_ID;
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
  return {
    url: `https://meet.google.com/${meet.data.conferenceData.conferenceId}`,
    name
  };
};
