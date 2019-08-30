const { google } = require("googleapis");
const { login } = require("./google-api");

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const createEvent = async (auth, user) => {
  const calendar = google.calendar({ version: "v3", auth });

  var event = {
    summary: `Call by ${user}`,
    start: {
      dateTime: new Date().toISOString(),
      timeZone: "Europe/Paris"
    },
    end: {
      dateTime: addMinutes(new Date(), "15").toISOString(),
      timeZone: "Europe/Paris"
    }

    // attendees: [{ email: "benjamin.levesque@request.network" }, { email: "sbrin@example.com" }],
    // reminders: {
    //   useDefault: false,
    //   overrides: [
    //     { method: "email", minutes: 24 * 60 },
    //     { method: "popup", minutes: 10 }
    //   ]
    // }
  };

  const eventCreateResponse = await calendar.events.insert({
    auth: auth,
    calendarId: "request.network_8aerpjn4aq0ij5r636da80kv2k@group.calendar.google.com",
    resource: event
  });

  const meet = await calendar.events.patch({
    calendarId: "request.network_8aerpjn4aq0ij5r636da80kv2k@group.calendar.google.com",
    eventId: eventCreateResponse.data.id,
    resource: {
      conferenceData: {
        createRequest: { requestId: "7qxalsvy0e" }
      }
    },
    conferenceDataVersion: 1
  });
    return `https://meet.google.com/${meet.data.conferenceData.conferenceId}`;
};

module.exports ={
  createEvent
};