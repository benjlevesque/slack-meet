# Slack Meet

Enables `/meet` command in Slack to instantly create a Google Meet conference.

## Installation

- create a Google service account
- create a Google app, using the above service account
- create a Google calendar, and give access to the service account

- TODO: explain how to get the Token.

```bash
docker run -e CALENDAR_ID=[CALENDAR_ID] -e CLIENT_ID=[CLIENT_ID] -e CLIENT_SECRET=[CLIENT_SECRET] -e TOKEN=[TOKEN] benjlevesque/slack-meet
```
